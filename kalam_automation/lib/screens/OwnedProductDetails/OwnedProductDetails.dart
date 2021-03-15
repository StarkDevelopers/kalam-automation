import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../models/order.model.dart';
import '../../services/orders.service.dart';
import '../../widgets/AppBar.dart';
import '../../widgets/Drawer.dart';
import '../../screens/Products/Products.dart';
import '../../providers/products.provider.dart';
import './OwnedProductDetailsForm/OwnedProductDetailsForm.dart';

class OwnedProductDetails extends StatelessWidget {
  static final String routeName = '/owned-products-details';

  @override
  Widget build(BuildContext context) {
    var arguments =
        ModalRoute.of(context).settings.arguments as Map<String, String>;
    var orderItemId = arguments['orderItemId'];

    if (orderItemId == null) {
      Navigator.of(context).pushReplacementNamed(ProductsScreen.routeName);
    }

    final products = Provider.of<Products>(context, listen: false).items;

    return Scaffold(
      appBar: KalamAppBar(),
      body: FutureBuilder(
        future: OrdersService.fetchOrder(orderItemId),
        builder: (ctx, dataSnapshot) {
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else if (dataSnapshot.error != null) {
            return Center(
              child: Text(
                'Order not found!',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20.0,
                ),
              ),
            );
          } else {
            Order order = dataSnapshot.data as Order;

            var product =
                products.firstWhere((element) => element.id == order.productId);

            return SingleChildScrollView(
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    OrderItemDetailsTitle(label: product.name, size: 24.0),
                    SizedBox(height: 5.0),
                    Divider(
                      thickness: 2.0,
                    ),
                    SizedBox(height: 5.0),
                    OrderItemDetailsTitle(label: 'Order Id'),
                    OrderItemDetailsValue(value: order.id ?? ''),
                    SizedBox(height: 10.0),
                    OrderItemDetailsTitle(label: 'IMEI Number'),
                    OrderItemDetailsValue(value: order.imeiNumber ?? ''),
                    SizedBox(height: 10.0),
                    OrderItemDetailsTitle(label: 'Sim Card Number'),
                    OrderItemDetailsValue(value: order.simCardNumber ?? ''),
                    SizedBox(height: 10.0),
                    OrderItemDetailsTitle(label: 'Mobile Number'),
                    OrderItemDetailsValue(value: order.mobileNumber ?? ''),
                    SizedBox(height: 5.0),
                    Divider(
                      thickness: 2.0,
                    ),
                    SizedBox(height: 5.0),
                    OwnedProductDetailsForm(order),
                  ],
                ),
              ),
            );
          }
        },
      ),
      drawer: KalamDrawer(),
    );
  }
}

class OrderItemDetailsTitle extends StatelessWidget {
  final String label;
  final double size;

  const OrderItemDetailsTitle({Key key, @required this.label, this.size = 22.0})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      this.label,
      style: TextStyle(
        fontSize: this.size,
        fontWeight: FontWeight.bold,
      ),
    );
  }
}

class OrderItemDetailsValue extends StatelessWidget {
  final String value;

  const OrderItemDetailsValue({
    Key key,
    @required this.value,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      this.value,
      style: TextStyle(
        fontSize: 18.0,
      ),
    );
  }
}
