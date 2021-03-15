import 'package:flutter/material.dart';

class RoundedButton extends StatelessWidget {
  final String text;
  final Function onPressed;
  final bool fullWidth;

  const RoundedButton({
    Key key,
    @required this.text,
    @required this.onPressed,
    this.fullWidth = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * (this.fullWidth ? 1 : 0.8),
      child: ClipRRect(
        borderRadius: BorderRadius.all(
          Radius.circular(32.0),
        ),
        child: FlatButton(
          padding: const EdgeInsets.symmetric(
            horizontal: 15.0,
            vertical: 20.0,
          ),
          color: Theme.of(context).accentColor,
          onPressed: onPressed,
          child: Text(
            this.text,
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}
