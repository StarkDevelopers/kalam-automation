import 'package:flutter/material.dart';

import '../../images/Images.dart';
import './widgets/LoginForm.dart';

class Login extends StatelessWidget {
  static final String routeName = '/login';

  final numberController = TextEditingController();
  final passwordController = TextEditingController();

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
                LoginForm(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
