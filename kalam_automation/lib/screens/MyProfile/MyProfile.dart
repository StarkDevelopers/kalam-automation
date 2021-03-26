import 'package:flutter/material.dart';

import '../../widgets/AppBar.dart';
import '../../widgets/Drawer.dart';
import './MyProfileForm/MyProfileForm.dart';
import '../../models/user.model.dart';
import '../../services/user.service.dart';

class MyProfile extends StatelessWidget {
  static final String routeName = '/my-profile';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: KalamAppBar(),
      body: FutureBuilder(
        future: UserService.getUser(true),
        builder: (ctx, dataSnapshot) {
          if (dataSnapshot.connectionState == ConnectionState.waiting) {
            return Center(
              child: CircularProgressIndicator(),
            );
          } else if (dataSnapshot.error != null) {
            return Center(
              child: Text(
                'User not found!',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 20.0,
                ),
              ),
            );
          } else {
            User user = dataSnapshot.data as User;

            return SingleChildScrollView(
              child: Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      user.name,
                      style: TextStyle(
                        fontSize: 24.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 10.0),
                    Text(
                      user.number.toString(),
                      style: TextStyle(
                        fontSize: 18.0,
                      ),
                    ),
                    SizedBox(height: 10.0),
                    Divider(
                      thickness: 2.0,
                    ),
                    SizedBox(height: 5.0),
                    MyProfileForm(user),
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
