import 'package:flutter/material.dart';

import '../../screens/Login/Login.dart';
import '../../images/Images.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Navigator.of(context).pushReplacementNamed(Login.routeName);

    return Scaffold(
      body: Center(
        child: Image.asset(
          Images.LOGO,
          height: MediaQuery.of(context).size.height * 0.2,
          width: MediaQuery.of(context).size.height * 0.2,
        ),
      ),
    );
  }
}
