<template>
<div>
  <h1>Welcome to Covenant</h1>
  <etio></etio>
  <div v-if='user'>
    <a :href=" '/users/' + user.username">{{user.username}}</a>
    |
    <a href="/listings/create/">Create Listing</a>
  </div>
  <div v-else>
    <a href="/login">Login</a>
    |
    <a href="/users/register">Register</a>

  </div>
<br />

<!-- search mechanism-->
<div id='finder'>

  <form method='get' action='/finder'>
    <select v-model='category' @change='onChange' name='category' required>
         <option selected hidden>Categories</option>
         <option value='outerwear'>Outerwear</option>
         <option value='tops'>Tops</option>
         <option value='bottoms'>Bottoms</option>
         <option value='footwear'>Footwear</option>
         <option value='accessories'>Accessories</option>
    </select>

    <br />
    <select id="size-select" v-model='size' name='size' required>
         <option selected hidden>Size</option>
         <option  v-for='option in options' :value='option.value'> {{ option.text }} </option>
    </select>

    <br />
    <input type='text' name='finderSearch' placeholder='Enter designer, item name...'/>
    <br />
    <input type='text' name='minPrice' placeholder='Min Price'>
    <br />
    <input type='text' name='maxPrice' placeholder='Max Price'/>
    <br />
    <input type='submit' value='find' />

  </form>

</div>


  <div class='home-listings'>
    <table>
      <h2 id='title'>All Listings</h2>
      <tr id='table-border'>
        <th>Title</th>
        <th>Designer</th>
        <th>Price</th>
        <th>Category</th>
        <th>Size</th>
        <th>Created At</th>
      </tr>
      <tr v-for='listing in listings'>
        <td><a :href="'/listings/' + listing._id">{{listing.title}}</a></td>
        <td>{{listing.designer}}</td>
        <td>{{listing.price}}</td>
        <td>{{listing.category}}</td>
        <td>{{listing.conversion}}</td>
        <td>{{listing.createdAt}}</td>
      </tr>

    </table>
  </div>

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
      user: null,
      category: 'Categories', //sets default values
      size: 'Size', //this sets default values
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
      let converted = this.options[selected - 1].text
      this.converted = converted
      console.log(this.converted)
    }
  },
  components: ['etio']
}
</script>

<style lang="css">
  .home-listings table{
    margin-top: 2em;
    display: inline-block;
  }
  table{
    border-collapse: collapse;
    table-layout: fixed;
  }
  #table-border{
    border-bottom: .1em solid #2c3e50;
  }
  tr{
    padding: 10em;
  }
</style>
