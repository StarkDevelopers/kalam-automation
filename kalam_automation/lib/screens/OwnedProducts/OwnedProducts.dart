import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../../models/order.model.dart';
import '../../services/orders.service.dart';
import '../../widgets/AppBar.dart';
import '../../screens/ServerError/ServerError.dart';
import '../../widgets/Drawer.dart';
import '../../providers/products.provider.dart';
import '../../images/Images.dart';
import '../../enums/ProductStatus.enum.dart';
import '../../screens/OwnedProductDetails/OwnedProductDetails.dart';

class OwnedProducts extends StatelessWidget {
  static final String routeName = '/owned-products';

  @override
  Widget build(BuildContext context) {
    final products = Provider.of<Products>(context, listen: false).items;

    return Scaffold(
      appBar: KalamAppBar(),
      body: FutureBuilder(
        future: OrdersService.listOrders(),
        builder: (ctx, dataSnapshot) {
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else if (dataSnapshot.error != null) {
            return ServerError();
          } else {
            return dataSnapshot.data.length == 0
                ? Center(
                    child: Text(
                      'No orders!',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20.0,
                      ),
                    ),
                  )
                : ListView.builder(
                    itemBuilder: (ctx, index) {
                      var order = dataSnapshot.data[index] as Order;
                      var product = products.firstWhere(
                          (element) => element.id == order.productId);
                      var orderStatus = order.status ?? 'Pending';

                      return Container(
                        margin: const EdgeInsets.all(5.0),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 5.0,
                          vertical: 8.0,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.4),
                              spreadRadius: 1.0,
                              blurRadius: 4.0,
                              offset: Offset(0, 1),
                            ),
                          ],
                        ),
                        child: ListTile(
                          leading: CircleAvatar(
                            radius: 24.0,
                            backgroundImage:
                                AssetImage(Images.path(product.image)),
                          ),
                          title: Text(
                            product.name,
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 18.0),
                          ),
                          subtitle: Padding(
                            padding: const EdgeInsets.only(top: 4.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  DateFormat.yMd()
                                      .format(order.orderDate)
                                      .toString(),
                                  style: TextStyle(fontSize: 16.0),
                                ),
                                Text(
                                  '#${order.orderId}',
                                  style: TextStyle(fontSize: 12.0),
                                ),
                                SizedBox(height: 10.0),
                                OrderInstruction(orderStatus: orderStatus),
                              ],
                            ),
                          ),
                          trailing: OrderStatus(orderStatus: orderStatus),
                          onTap: () => {
                            orderStatus == ProductStatus.APPROVED
                                ? Navigator.of(context).pushNamed(
                                    OwnedProductDetails.routeName,
                                    arguments: {
                                      'orderItemId': order.id,
                                    },
                                  )
                                : null,
                          },
                        ),
                      );
                    },
                    itemCount: dataSnapshot.data.length,
                  );
          }
        },
      ),
      drawer: KalamDrawer(),
    );
  }
}

class OrderInstruction extends StatelessWidget {
  final String orderStatus;

  const OrderInstruction({
    Key key,
    @required this.orderStatus,
  }) : super(key: key);

  String get instruction {
    switch (orderStatus) {
      case ProductStatus.PENDING:
        return 'Admin will approve upon receiving payment';
      case ProductStatus.APPROVED:
        return 'Fill details about product user';
      case ProductStatus.INACTIVE:
        return 'Admin will activate upon receiving payment';
      case ProductStatus.ACTIVE:
        return '';
      default:
        return 'Admin will approve upon receiving payment';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      instruction,
      style: TextStyle(
        fontSize: 14.0,
        color: Colors.teal,
      ),
    );
  }
}

class OrderStatus extends StatelessWidget {
  const OrderStatus({
    Key key,
    @required this.orderStatus,
  }) : super(key: key);

  final String orderStatus;

  Color get statusColor {
    switch (orderStatus) {
      case ProductStatus.PENDING:
        return Colors.orange;
      case ProductStatus.APPROVED:
        return Colors.blue;
      case ProductStatus.INACTIVE:
        return Colors.grey;
      case ProductStatus.ACTIVE:
        return Colors.green;
      default:
        return Colors.orange;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Text(
      orderStatus,
      style: TextStyle(
          fontWeight: FontWeight.bold, fontSize: 18.0, color: statusColor),
    );
  }
}
