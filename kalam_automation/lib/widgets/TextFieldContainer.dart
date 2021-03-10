import 'package:flutter/material.dart';

class TextFieldContainer extends StatelessWidget {
  final String hintText;
  final IconData icon;
  final bool obscureText;

  const TextFieldContainer({
    Key key,
    @required this.hintText,
    @required this.icon,
    this.obscureText = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: 15.0,
        vertical: 8.0,
      ),
      width: MediaQuery.of(context).size.width * 0.8,
      child: TextField(
        obscureText: this.obscureText,
        decoration: InputDecoration(
          icon: Icon(
            this.icon,
          ),
          border: InputBorder.none,
          hintText: this.hintText,
        ),
      ),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.all(
          Radius.circular(32.0),
        ),
        color: Colors.teal[50],
      ),
    );
  }
}
