import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../images/Images.dart';
import '../../../providers/products.provider.dart';
import '../../../providers/cart.provider.dart';

class CartItems extends StatefulWidget {
  @override
  _CartItemsState createState() => _CartItemsState();
}

class _CartItemsState extends State<CartItems> {
  @override
  Widget build(BuildContext context) {
    final products = Provider.of<Products>(context).items;
    final cartItems = Provider.of<Cart>(context).items;
    return cartItems.length == 0
        ? Center(
            child: Text(
              'Cart is empty!',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20.0,
              ),
            ),
          )
        : Column(
            children: <Widget>[
              Expanded(
                child: ListView.builder(
                  itemBuilder: (ctx, index) {
                    var cartItem = cartItems[index];
                    var product = products
                        .firstWhere((element) => element.id == cartItem.id);

                    return Container(
                      margin: const EdgeInsets.all(5.0),
                      padding: const EdgeInsets.all(5.0),
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
                              AssetImage(Images.PATH(product.image)),
                        ),
                        title: Text(
                          product.name,
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 16.0),
                        ),
                        trailing: Text(
                          'x ${cartItem.quantity}',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18.0),
                        ),
                      ),
                    );
                  },
                  itemCount: cartItems.length,
                ),
              ),
              ButtonTheme(
                minWidth: double.infinity,
                height: 48.0,
                buttonColor: Theme.of(context).accentColor,
                child: RaisedButton(
                  child: Text(
                    'Place Order',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 18.0,
                      color: Colors.white,
                    ),
                  ),
                  onPressed: () {},
                  // style: ButtonStyle(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.zero,
                  ),
                ),
              ),
            ],
          );
  }
}
