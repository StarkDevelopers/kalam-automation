import 'package:flutter/material.dart';

import '../../images/Images.dart';

class ServerError extends StatelessWidget {
  static final String routeName = '/server-error';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            Images.SERVER_ERROR,
          ),
          Text(
            'Server Error!!!',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 22.0,
            ),
          ),
          Text(
            'Please contact the administrator.',
            style: TextStyle(
              fontSize: 18.0,
            ),
          ),
        ],
      ),
    );
  }
}
