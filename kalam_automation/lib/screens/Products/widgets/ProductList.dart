import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../images/Images.dart';
import '../../../providers/products.provider.dart';
import '../../../providers/cart.provider.dart';

class ProductList extends StatefulWidget {
  @override
  _ProductListState createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  String cartQuantity(Cart cart, productId) {
    var foundCartItemIndex =
        cart.items.indexWhere((element) => element.id == productId);

    if (foundCartItemIndex == -1) {
      return '0';
    }

    return cart.items[foundCartItemIndex].quantity.toString();
  }

  @override
  Widget build(BuildContext context) {
    final products = Provider.of<Products>(context).items;
    final cart = Provider.of<Cart>(context, listen: false);

    return ListView.builder(
      itemBuilder: (ctx, index) {
        var product = products[index];
        return Container(
          margin: EdgeInsets.all(10.0),
          height: 350.0,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.all(Radius.circular(15.0)),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.7),
                spreadRadius: 3.0,
                blurRadius: 7.0,
                offset: Offset(0, 3),
              ),
            ],
          ),
          child: Column(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(15.0),
                  topRight: Radius.circular(15.0),
                ),
                child: Image.asset(Images.PATH(product.image),
                    height: 300.0, width: double.infinity, fit: BoxFit.cover),
              ),
              Container(
                height: 50.0,
                padding: EdgeInsets.symmetric(vertical: 5.0, horizontal: 10.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        product.name,
                        style: TextStyle(
                            fontSize: 20.0, fontWeight: FontWeight.bold),
                      ),
                    ),
                    Container(
                      child: Row(
                        children: [
                          Material(
                            color: Theme.of(context).accentColor,
                            borderRadius:
                                BorderRadius.all(Radius.circular(40.0)),
                            child: SizedBox(
                              height: 40.0,
                              width: 40.0,
                              child: IconButton(
                                color: Colors.white,
                                icon: Icon(Icons.remove),
                                onPressed: () => cart.removeItem(product.id),
                              ),
                            ),
                          ),
                          Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Consumer<Cart>(
                                builder: (ctx, cart, child) =>
                                    Text(cartQuantity(cart, product.id),
                                        style: TextStyle(
                                          fontSize: 18.0,
                                          fontWeight: FontWeight.bold,
                                        )),
                              )),
                          Material(
                            color: Theme.of(context).accentColor,
                            borderRadius:
                                BorderRadius.all(Radius.circular(40.0)),
                            child: SizedBox(
                              height: 40.0,
                              width: 40.0,
                              child: IconButton(
                                color: Colors.white,
                                icon: Icon(Icons.add),
                                onPressed: () => cart.addItem(product.id),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        );
      },
      itemCount: products.length,
    );
  }
}
