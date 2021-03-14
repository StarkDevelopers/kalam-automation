import 'package:flutter/material.dart';

import '../../widgets/AppBar.dart';

class OwnedProducts extends StatelessWidget {
  static final String routeName = '/owned-products';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: KalamAppBar(),
      body: Text('Orders'),
    );
  }
}
