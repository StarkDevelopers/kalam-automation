import 'package:flutter/material.dart';

import '../../images/Images.dart';

class ServerError extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
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
    );
  }
}
