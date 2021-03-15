import 'package:flutter/foundation.dart';

class Order {
  final String id;
  final String productId;
  final String orderId;
  DateTime orderDate;
  String status;
  String imeiNumber;
  String simCardNumber;
  String mobileNumber;
  String nameOfDriver;
  String licenseNumber;
  String numberPlate;
  String city;
  String state;

  Order({
    @required this.id,
    @required this.productId,
    @required this.orderId,
    this.orderDate,
    this.status,
    this.imeiNumber,
    this.simCardNumber,
    this.mobileNumber,
    this.nameOfDriver,
    this.licenseNumber,
    this.numberPlate,
    this.city,
    this.state,
  });

  factory Order.fromJson(dynamic order) {
    return Order(
      id: order['_id'],
      productId: order['productId'],
      orderId: order['orderId']['_id'],
      status: order['status'],
      orderDate: DateTime.parse(order['orderId']['date']),
    );
  }

  factory Order.allFieldsFromJson(dynamic order) {
    return Order(
      id: order['_id'],
      productId: order['productId'],
      orderId: order['orderId'],
      imeiNumber: order['imeiNumber'],
      status: order['status'],
      simCardNumber: order['simCardNumber'],
      mobileNumber: order['mobileNumber'],
      nameOfDriver: order['nameOfDriver'],
      licenseNumber: order['licenseNumber'],
      numberPlate: order['numberPlate'],
      city: order['city'],
      state: order['state'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'productId': productId,
      'orderId': orderId,
      'imeiNumber': imeiNumber,
      'status': status,
      'simCardNumber': simCardNumber,
      'mobileNumber': mobileNumber,
      'nameOfDriver': nameOfDriver,
      'licenseNumber': licenseNumber,
      'numberPlate': numberPlate,
      'city': city,
      'state': state,
    };
  }

  factory Order.clone(Order order) {
    return Order(
      id: order.id,
      productId: order.productId,
      orderId: order.orderId,
      status: order.status,
      imeiNumber: order.imeiNumber,
      simCardNumber: order.simCardNumber,
      mobileNumber: order.mobileNumber,
      nameOfDriver: order.nameOfDriver,
      licenseNumber: order.licenseNumber,
      numberPlate: order.numberPlate,
      city: order.city,
      state: order.state,
    );
  }
}
