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
  String installerName;
  String customerName;
  String companyName;
  String address;
  String gstNumber;
  String customerMobileNumber1;
  String customerMobileNumber2;
  String emailId;
  String vehicleNumber;
  String vehicleCompany;
  String gpsUserName;
  String gpsPassword;
  String aadharCardNumber;

  Order({
    @required this.id,
    @required this.productId,
    @required this.orderId,
    this.orderDate,
    this.status,
    this.imeiNumber,
    this.simCardNumber,
    this.mobileNumber,
    this.installerName,
    this.customerName,
    this.companyName,
    this.address,
    this.gstNumber,
    this.customerMobileNumber1,
    this.customerMobileNumber2,
    this.emailId,
    this.vehicleNumber,
    this.vehicleCompany,
    this.gpsUserName,
    this.gpsPassword,
    this.aadharCardNumber,
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
      installerName: order['installerName'],
      customerName: order['customerName'],
      companyName: order['companyName'],
      address: order['address'],
      gstNumber: order['gstNumber'],
      customerMobileNumber1: order['customerMobileNumber1'],
      customerMobileNumber2: order['customerMobileNumber2'],
      emailId: order['emailId'],
      vehicleNumber: order['vehicleNumber'],
      vehicleCompany: order['vehicleCompany'],
      gpsUserName: order['gpsUserName'],
      gpsPassword: order['gpsPassword'],
      aadharCardNumber: order['aadharCardNumber'],
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
      'installerName': installerName,
      'customerName': customerName,
      'companyName': companyName,
      'address': address,
      'gstNumber': gstNumber,
      'customerMobileNumber1': customerMobileNumber1,
      'customerMobileNumber2': customerMobileNumber2,
      'emailId': emailId,
      'vehicleNumber': vehicleNumber,
      'vehicleCompany': vehicleCompany,
      'gpsUserName': gpsUserName,
      'gpsPassword': gpsPassword,
      'aadharCardNumber': aadharCardNumber,
    };
  }

  factory Order.clone(Order order,
      {Map<String, String> updateFields = const {}}) {
    return Order(
      id: order.id,
      productId: order.productId,
      orderId: order.orderId,
      status: order.status,
      imeiNumber: order.imeiNumber,
      simCardNumber: order.simCardNumber,
      mobileNumber: order.mobileNumber,
      installerName: updateFields['installerName'] ?? order.installerName,
      customerName: updateFields['customerName'] ?? order.customerName,
      companyName: updateFields['companyName'] ?? order.companyName,
      address: updateFields['address'] ?? order.address,
      gstNumber: updateFields['gstNumber'] ?? order.gstNumber,
      customerMobileNumber1:
          updateFields['customerMobileNumber1'] ?? order.customerMobileNumber1,
      customerMobileNumber2:
          updateFields['customerMobileNumber2'] ?? order.customerMobileNumber2,
      emailId: updateFields['emailId'] ?? order.emailId,
      vehicleNumber: updateFields['vehicleNumber'] ?? order.vehicleNumber,
      vehicleCompany: updateFields['vehicleCompany'] ?? order.vehicleCompany,
      gpsUserName: updateFields['gpsUserName'] ?? order.gpsUserName,
      gpsPassword: updateFields['gpsPassword'] ?? order.gpsPassword,
      aadharCardNumber:
          updateFields['aadharCardNumber'] ?? order.aadharCardNumber,
    );
  }
}
