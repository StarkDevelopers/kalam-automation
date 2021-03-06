import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../widgets/RoundedButton.dart';
import '../../../widgets/TextFieldContainer.dart';
import '../../../services/user.service.dart';
import '../../../models/user.model.dart';
import '../../../providers/auth.provider.dart';
import '../../../helpers/SharedPreferenceHelper.dart';

class LoginForm extends StatefulWidget {
  static final String routeName = '/login';

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final numberController = TextEditingController();
  final passwordController = TextEditingController();

  Future<void> login(BuildContext context) async {
    try {
      String number = numberController.text;
      String password = passwordController.text;

      if (number == '' || password == '') {
        throw Exception('Number and password must not be empty');
      }

      User user = await UserService.login(number, password);

      await SharedPreferenceHelper.setPreference('token', user.token);

      Provider.of<Auth>(context, listen: false).login(user);

      Navigator.of(context).pushNamed('/');
    } catch (error) {
      print(error.toString());
      final scaffoldContext = Scaffold.of(context);
      final snackBar = SnackBar(content: Text('Number or password is invalid'));

      scaffoldContext.showSnackBar(snackBar);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextFieldContainer(
          icon: Icons.phone_android,
          hintText: 'Your mobile number',
          controller: numberController,
          isNumber: true,
        ),
        SizedBox(height: 20.0),
        TextFieldContainer(
          icon: Icons.vpn_key,
          hintText: 'Password',
          controller: passwordController,
          obscureText: true,
        ),
        SizedBox(height: 20.0),
        RoundedButton(
          text: 'LOGIN',
          onPressed: () => login(context),
        ),
      ],
    );
  }
}
