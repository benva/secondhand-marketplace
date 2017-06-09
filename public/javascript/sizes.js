$(document).ready(function() {
  var tops = [{
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
  }];
  var outerwear = tops;
  var bottoms = [{
    value: 26,
    text: '26 (US) / 42 (EU) / 0 (JP)'
  },
  {
    value: 28,
    text: '28 (US) / 44 (EU) / 1 (JP)'
  },
  {
    value: 30,
    text: '30 (US) / 46 (EU) / 2 (JP)'
  },
  {
    value: 32,
    text: '32 (US) / 48 (EU) / 3 (JP)'
  },
  {
    value: 34,
    text: '34 (US) / 50 (EU) / 4 (JP)'
  }];
  var footwear = [{
    value: 6,
    text: '6 (US) / 39 (EU)'
  },
  {
    value: 7,
    text: '7 (US) / 40 (EU)'
  },
  {
    value: 8,
    text: '8 (US) / 41 (EU)'
  },
  {
    value: 9,
    text: '9 (US) / 42 (EU)'
  },
  {
    value: 10,
    text: '10 (US) / 43 (EU)'
  },
  {
    value: 11,
    text: '11 (US) / 44 (EU)'
  },
  {
    value: 12,
    text: '12 (US) / 45 (EU)'
  },
  {
    value: 13,
    text: '13 (US) / 46 (EU)'
  }];
  var accessories = [{
    value: 100,
    text: "OS"
  }];

  $('#category').change(function() {

    // this usage of eval is acceptable due to the fact that the variable comes from a trusted source.
    var sizes = eval($(this).val());

    $('#size option').remove();
    $('#size').append($('<option selected disabled> Size </option>'));
    $.each(sizes, function(i, size) {
      $('#size').append($('<option>', {
        value: size.value,
        text: size.text
      }));
    });
    $('#size').change(function(){
      $('#conversion').val(this.options[this.selectedIndex].text);
    });
  });
});
