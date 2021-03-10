import 'package:flutter/material.dart';

import '../../widgets/RoundedButton.dart';
import '../../widgets/TextFieldContainer.dart';
import '../../images/Images.dart';

class Login extends StatelessWidget {
  static final String routeName = '/login';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: SizedBox(
            width: double.infinity,
            height: MediaQuery.of(context).size.height,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'Kalam Automation',
                  style: TextStyle(
                    fontSize: 30.0,
                    fontFamily: 'Poppins',
                  ),
                ),
                Text(
                  'The GPS Expert',
                  style: TextStyle(
                    fontSize: 18.0,
                    fontFamily: 'Poppins',
                  ),
                ),
                SizedBox(height: 15.0),
                Image.asset(Images.LOGIN),
                SizedBox(height: 30.0),
                TextFieldContainer(
                  icon: Icons.phone_android,
                  hintText: 'Your mobile number',
                ),
                SizedBox(height: 20.0),
                TextFieldContainer(
                  icon: Icons.vpn_key,
                  hintText: 'Password',
                  obscureText: true,
                ),
                SizedBox(height: 20.0),
                RoundedButton(text: 'LOGIN'),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
