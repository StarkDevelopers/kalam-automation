import 'package:flutter/material.dart';
import 'package:kalam_automation/screens/OwnedProducts/OwnedProducts.dart';

import '../../../models/order.model.dart';
import '../../../services/orders.service.dart';
import '../../../widgets/RoundedButton.dart';

class OwnedProductDetailsForm extends StatelessWidget {
  final Order order;
  final TextEditingController driverNameController = TextEditingController();
  final TextEditingController licenseController = TextEditingController();
  final TextEditingController numberPlateController = TextEditingController();
  final TextEditingController cityController = TextEditingController();
  final TextEditingController stateController = TextEditingController();

  OwnedProductDetailsForm(this.order);

  Future<void> updateDetails(BuildContext context, Order order) async {
    try {
      Order updatedOrder = Order.clone(order);

      updatedOrder.nameOfDriver = driverNameController.text;
      updatedOrder.licenseNumber = licenseController.text;
      updatedOrder.numberPlate = numberPlateController.text;
      updatedOrder.city = cityController.text;
      updatedOrder.state = stateController.text;

      if (updatedOrder.nameOfDriver == '' ||
          updatedOrder.licenseNumber == '' ||
          updatedOrder.numberPlate == '' ||
          updatedOrder.city == '' ||
          updatedOrder.state == '') {
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
          decoration: InputDecoration(labelText: 'Name of the Driver'),
          controller: driverNameController,
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'License Number'),
          controller: licenseController,
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'Number Plate'),
          controller: numberPlateController,
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'City'),
          controller: cityController,
        ),
        SizedBox(height: 10.0),
        TextField(
          decoration: InputDecoration(labelText: 'State'),
          controller: stateController,
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
