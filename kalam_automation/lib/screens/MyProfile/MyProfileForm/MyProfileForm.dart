import 'package:flutter/material.dart';

import '../../../widgets/RoundedButton.dart';
import '../../../models/user.model.dart';
import '../../../screens/Products/Products.dart';
import '../../../services/user.service.dart';

class MyProfileForm extends StatelessWidget {
  final User user;
  final Map<String, TextEditingController> controllers = {
    'password': TextEditingController(),
    'number2': TextEditingController(),
    'email': TextEditingController(),
    'address': TextEditingController(),
    'aadharCardNumber': TextEditingController(),
    'panCardNumber': TextEditingController(),
    'technicianName': TextEditingController(),
  };

  MyProfileForm(this.user) {
    controllers.forEach((key, value) {
      var userJson = this.user.toJson();
      value.text = userJson[key] != null ? userJson[key].toString() : '';
    });
  }

  Future<void> updateDetails(BuildContext context, User user) async {
    try {
      Map<String, String> updateFields = {};

      bool valid = true;
      controllers.forEach((key, value) {
        if (value.text == '') {
          valid = false;
        } else {
          updateFields[key] = value.text;
        }
      });

      User updatedUser = User.clone(user, updateFields: updateFields);

      if (!valid) {
        final scaffoldContext = Scaffold.of(context);
        final snackBar = SnackBar(content: Text('Fill out all the details'));

        scaffoldContext.showSnackBar(snackBar);
        return;
      }

      await UserService.updateDetails(updatedUser);

      Navigator.of(context).pushReplacementNamed(ProductsScreen.routeName);
    } catch (error) {
      print(error.toString());
      final scaffoldContext = Scaffold.of(context);
      final snackBar = SnackBar(content: Text('Failed to update details'));

      scaffoldContext.showSnackBar(snackBar);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          decoration: InputDecoration(labelText: 'Password'),
          controller: controllers['password'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Number 2'),
          controller: controllers['number2'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Email'),
          controller: controllers['email'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Address'),
          controller: controllers['address'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Aadhar Card Number'),
          controller: controllers['aadharCardNumber'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'PAN Card Number'),
          controller: controllers['panCardNumber'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Technician Name'),
          controller: controllers['technicianName'],
        ),
        SizedBox(height: 30.0),
        RoundedButton(
          text: 'UPDATE DETAILS',
          onPressed: () => updateDetails(context, user),
          fullWidth: true,
        ),
      ],
    );
  }
}
