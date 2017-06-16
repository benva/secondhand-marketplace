<template>
<div class='create'>
  <h1 id='title'>List Item</h1>
  <h5 v-if='error' id='error-styles'>{{error}}</h5>

  <form method='post' action='/listings/create' enctype='multipart/form-data'>
    <input type='hidden' name='_csrf' :value='csrfToken' required/>
    <input type='text' placeholder='Designer' name='designer' required/>
    <br />
    <input type='text' placeholder='Title' name='title' required/>
    <br />
    <input type='text' placeholder='Description' name='description' required/>
    <br />
    <input type='text' placeholder='Price' name='price' required/>
    <br />
    <input type='file' name='photos' multiple required/>
    <br/>
    <select v-model='category' @change='onChange' name='category' required>
         <option selected hidden>Categories</option>
         <option value='outerwear'>Outerwear</option>
         <option value='tops'>Tops</option>
         <option value='bottoms'>Bottoms</option>
         <option value='footwear'>Footwear</option>
         <option value='accessories'>Accessories</option>
    </select>
    <br />
    <select id="size-select" v-model='list' name='size' @change='sizeChange' required>
         <option selected hidden>Size</option>
         <option  v-for='option in options' :value='option.value'> {{ option.text }} </option>
    </select>

    <input name='conversion' type='hidden' :value='converted'/>

    <br />
    <br />

    <input type='submit' />
  </form>
</div>
</template>

<script>
export default {
  data: function() {
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
      }
    ]
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
      }
    ]
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
      }
    ]
    return {
      error: false,
      category: 'Categories', //sets default values
      list: 'Size', //this sets default values
      converted: '',
      optionsData: {
        tops: tops,
        outerwear: tops,
        bottoms: bottoms,
        footwear: footwear,
        accessories: [{
          value: 100,
          text: 'OS'
        }]
      }
    }
  },
  computed: {
    options: function() {
      let options = ''
      switch (this.category) {
        case 'tops':
          options = this.optionsData.tops
          break;
        case 'outerwear':
          options = this.optionsData.outerwear
          break;
        case 'bottoms':
          options = this.optionsData.bottoms
          break;
        case 'footwear':
          options = this.optionsData.footwear
          break;
        case 'accessories':
          options = this.optionsData.accessories
          break;
        default:
          options = this.optionsData.size
      }
      return options
    }
  },
  methods: {
    onChange: function() {
      this.options = this.options
      console.log(this.options)
    },
    sizeChange: function(){
      let selected = document.getElementById("size-select").selectedIndex
      let converted = this.options[selected].text
      this.converted = converted
      console.log(this.converted)
    }
  }
}
</script>

<style lang='css'>

</style>
