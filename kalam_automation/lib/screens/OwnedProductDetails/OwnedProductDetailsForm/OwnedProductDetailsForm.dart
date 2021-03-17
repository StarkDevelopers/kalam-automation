import 'package:flutter/material.dart';

import '../../../models/order.model.dart';
import '../../../services/orders.service.dart';
import '../../../widgets/RoundedButton.dart';
import '../../../screens/OwnedProducts/OwnedProducts.dart';

class OwnedProductDetailsForm extends StatelessWidget {
  final Order order;
  final Map<String, TextEditingController> controllers = {
    'customerName': TextEditingController(),
    'companyName': TextEditingController(),
    'address': TextEditingController(),
    'gstNumber': TextEditingController(),
    'customerMobileNumber1': TextEditingController(),
    'customerMobileNumber2': TextEditingController(),
    'emailId': TextEditingController(),
    'vehicleNumber': TextEditingController(),
    'vehicleCompany': TextEditingController(),
    'gpsUserName': TextEditingController(),
    'gpsPassword': TextEditingController(),
    'aadharCardNumber': TextEditingController(),
  };

  OwnedProductDetailsForm(this.order);

  Future<void> updateDetails(BuildContext context, Order order) async {
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

      Order updatedOrder = Order.clone(order, updateFields: updateFields);

      if (!valid) {
        final scaffoldContext = Scaffold.of(context);
        final snackBar =
            SnackBar(content: Text('Fill out all the details for this order'));

        scaffoldContext.showSnackBar(snackBar);
        return;
      }

      await OrdersService.updateDetails(updatedOrder);

      Navigator.of(context).pushReplacementNamed(OwnedProducts.routeName);
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
          decoration: InputDecoration(labelText: 'Customer Name'),
          controller: controllers['customerName'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Company Name'),
          controller: controllers['companyName'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Address'),
          controller: controllers['address'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'GST Number'),
          controller: controllers['gstNumber'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Customer Mobile Number 1'),
          controller: controllers['customerMobileNumber1'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Customer Mobile Number 2'),
          controller: controllers['customerMobileNumber2'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Email ID'),
          controller: controllers['emailId'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Vehicle Number'),
          controller: controllers['vehicleNumber'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Vehicle Company'),
          controller: controllers['vehicleCompany'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'GPS User Name'),
          controller: controllers['gpsUserName'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'GPS Password'),
          controller: controllers['gpsPassword'],
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Aadhar Card Number'),
          controller: controllers['aadharCardNumber'],
        ),
        SizedBox(height: 30.0),
        RoundedButton(
          text: 'UPDATE DETAILS',
          onPressed: () => updateDetails(context, order),
          fullWidth: true,
        ),
      ],
    );
  }
}
