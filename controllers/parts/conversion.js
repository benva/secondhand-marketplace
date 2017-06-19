var upper = [{
    value: 'xs',
    text: 'XS (US) / 42 (EU) / 0 (JP)'
  },
  {
    value: 's',
    text: 'S (US) / 44 (EU) / 1 (JP)'
  },
  {
    value: 'm',
    text: 'M (US) / 46 (EU) / 2 (JP)'
  },
  {
    value: 'l',
    text: 'L (US) / 48-50 (EU) / 3 (JP)'
  },
  {
    value: 'xl',
    text: 'XL (US) / 52 (EU) / 4 (JP)'
  }
]
exports.sizeList = {
    tops: upper,
    outerwear: upper,
    bottoms: [{
        value: "26",
        text: '26 (US) / 42 (EU) / 0 (JP)'
      },
      {
        value: "28",
        text: '28 (US) / 44 (EU) / 1 (JP)'
      },
      {
        value: "30",
        text: '30 (US) / 46 (EU) / 2 (JP)'
      },
      {
        value: "32",
        text: '32 (US) / 48 (EU) / 3 (JP)'
      },
      {
        value: "34",
        text: '34 (US) / 50 (EU) / 4 (JP)'
      }
    ],
  footwear: [{
        value: "6",
        text: '6 (US) / 39 (EU)'
      },
      {
        value: "7",
        text: '7 (US) / 40 (EU)'
      },
      {
        value: "8",
        text: '8 (US) / 41 (EU)'
      },
      {
        value: "9",
        text: '9 (US) / 42 (EU)'
      },
      {
        value: "10",
        text: '10 (US) / 43 (EU)'
      },
      {
        value: "11",
        text: '11 (US) / 44 (EU)'
      },
      {
        value: "12",
        text: '12 (US) / 45 (EU)'
      },
      {
        value: "13",
        text: '13 (US) / 46 (EU)'
      }
    ],
    accessories:[{
      value: "100",
      text: 'OS'
    }]
  }



// exports.conversion = function(category,value){
//   var clothes = {};
//   clothes[category] = category;
//   function findConversion(size){
//     if(size.value === this[0]){
//       return size;
//     }
//   }
//   return clothes[category].find(findConversion,[value]).text
// }
