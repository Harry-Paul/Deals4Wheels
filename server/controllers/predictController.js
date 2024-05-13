const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const axios = require('axios');

const handlePredict=async(req,res)=>{
    const {Year,Kilometers_Driven,Mileage,Engine,Power,Seats,Manufacturer,Fuel_Type,Transmission,Owner_Type}=req.body;
    const mean=[10.603607880370282, 57529.23498694517, 18.150555555555552, 1622.5509668178565, 112.99872603736956, 5.27741935483871, 0.043436980773795396, 0.019700925706147638, 0.001661523854735343, 0.004272489912176596, 0.00047472110135295516, 0.05198196059814859, 0.09992879183479705, 0.18561595062900546, 0.00047472110135295516, 0.00023736055067647758, 0.00688345596961785, 0.0026109660574412533, 0.00023736055067647758, 0.009494422027059102, 0.04557322572988369, 0.2008070258723, 0.052456681699501545, 0.004035129361500119, 0.004509850462853074, 0.015428435793971042, 0.0026109660574412533, 0.02254925231426537, 0.029432708283883217, 0.029907429385236172, 0.07002136244956088, 0.05269404225017802, 0.0037977688108236413, 0.5307381913126038, 0.00023736055067647758, 0.0018988844054118206, 0.45786850225492526, 0.7149299786375505, 0.0011868027533823878, 0.15950629005459294, 0.019700925706147638]
    const std=[3.237585873571665, 38099.55992157649, 4.574531686107167, 603.0148382496376, 53.07760011531114, 0.8028492898429884, 0.20386288087130994, 0.13898699369894815, 0.04073275109340675, 0.06523224486100476, 0.0217855088198272, 0.22201697285727043, 0.2999406314465928, 0.388842587783414, 0.021785508819827205, 0.01540651000961858, 0.08269036826050655, 0.051036919799895865, 0.01540651000961858, 0.09698716776972995, 0.20858243834264326, 0.40065155153025156, 0.2229725970755848, 0.06340190245387572, 0.06701177208242748, 0.12326396724291902, 0.051036919799895865, 0.14847900992707103, 0.16903610892024823, 0.17035217410857595, 0.2552133057902141, 0.22344849829742064, 0.06151620919010921, 0.4991135076319979, 0.015406510009618582, 0.04353996571673664, 0.498280914438624, 0.4515013743719473, 0.03443364176558333, 0.3661910192172831, 0.13898699369894812]
    let Manu=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    let Manu_str=['BMW', 'Chevrolet', 'Datsun',
    'Fiat', 'Force', 'Ford',
    'Honda', 'Hyundai', 'ISUZU',
    'Isuzu', 'Jaguar', 'Jeep',
    'Lamborghini', 'Land',
    'Mahindra', 'Maruti',
    'Mercedes-Benz', 'Mini',
    'Mitsubishi', 'Nissan',
    'Porsche', 'Renault', 'Skoda',
    'Tata', 'Toyota', 'Volkswagen',
    'Volvo']
    for(let i=0; i<Fuel_str.length;i++){
        if(Manufacturer===Manu_str[i]){
            Manu[i]=1;
            break;
        }
    }
    let Fuel=[0,0,0,0]
    let Fuel_str=['Diesel', 'Electric','LPG', 'Petrol']
    for(let i=0; i<Fuel_str.length;i++){
        if(Fuel_Type===Fuel_str[i]){
            Fuel[i]=1;
            break;
        }
    }
    let Owner=[0,0,0,0]
    let Owner_str=['Fourth & Above', 'Second', 'Third']
    for(let i=0; i<Owner_str.length;i++){
        if(Owner_Type===Owner_str[i]){
            Owner[i]=1;
            break;
        }
    }
    const arr=[Year].concat([Kilometers_Driven,Mileage,Engine,Power,Seats],Manu,Fuel,[1],Owner)
    let arr1=[]
    for(let i=0;i<arr.length;i++){
        let a=(arr[i]-mean[i])/std[i]
        arr1.append(a)
    }
    arr1 = Float32Array.from(arr1);
    predict(arr1)
    async function predict(data){
        let tensor =tf.tensor1d(data)
        tensor=tensor.expandDims(0)
        console.log("cvb")
        let model = await tf.loadLayersModel(
            "https://firebasestorage.googleapis.com/v0/b/deals4wheels-b38f7.appspot.com/o/model.json?alt=media&token=aae5d6e6-a426-4054-a9b5-ab2e6385444c"
        );
        console.log("abc")
        let pr= await model.predict(tensor).dataSync();
        console.log(pr)
    }
}

module.exports = {handlePredict};