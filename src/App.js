import React from 'react';
import './App.css';

// the Sign up page
class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleCountUpdate.bind(this);
        this.handleDiscountChange.bind(this);
        this.handleDiscountChange.bind(this);
        this.state = {
          itemlist:[
            {item:"/images/item1.jpg",price:20.00, count:0}, 
            {item:"/images/item2.jpg",price:30.00, count:0},
            {item:"/images/item3.jpg",price:20.00, count:0},
            {item:"/images/item4.jpg",price:20.00, count:0},
            {item:"/images/item5.jpg",price:50.00, count:0},
            {item:"/images/item6.jpg",price:20.00, count:0},
          ],
          currentprice: 0,
          finalprice: 0,
          error: false,
          errormessage: null,  
          addtax: true,
          discount: 0,
        }
    }

    handleCountUpdate(e, itemname){
        console.log("triggered")
        let item_list_copy = this.state.itemlist;
        let price = 0;
        for (let i = 0; i < item_list_copy.length; i++){
            if (item_list_copy[i].item === itemname){
                console.log("triggered")
                item_list_copy[i].count = e.target.value;
                console.log(e.target.value)
            }
            price += item_list_copy[i].price*item_list_copy[i].count;
        }
        // deal with tax
        let tax_multiplier = 1.13;
        if (this.state.addtax){
          tax_multiplier = 1.13;
        }else{
          tax_multiplier = 1;
        }
        // deal make the calculation;
        const request = new Request("/api/calculate", {
          method: 'post', 
          body: JSON.stringify({price:price, tax: tax_multiplier, discount: this.state.discount/100}),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        })
        fetch(request)
        .then(
          (res)=>{
            if (res.status !== 200){
                alert("woops! error code:"+res.status);
            }else{
                return res.json()
            }
          }
        ) 
        .then(
          (res)=>{
            console.log("price is ", res.price);
            this.setState({itemlist: item_list_copy, currentprice:price, finalprice: res.price})
          }
        )
        
    }


    handleTaxChange(e){
        
      let prev_tax_option = this.state.addtax;
      let tax_multiplier = 0;
      if (prev_tax_option){
          tax_multiplier = 1;
      }else{
        tax_multiplier = 1.13;
      }
      // send api to make the calculation
      const request = new Request("/api/calculate", {
        method: 'post', 
        body: JSON.stringify({price:this.state.currentprice, tax: tax_multiplier, discount: this.state.discount/100}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      })
      fetch(request)
      .then(
        (res)=>{
          if (res.status !== 200){
              alert("woops! error code:"+res.status);
          }else{
              return res.json()
          }
        }
      ) 
      .then(
        (res)=>{
          this.setState({finalprice: res.price, addtax:!this.state.addtax})
        }
      )
    }

    handleDiscountChange(e){
      let tax_multiplier = 1.13;
      if (this.state.addtax){
        tax_multiplier = 1.13;
      }else{
        tax_multiplier = 1;
      }
      let discount = e.target.value;
      const request = new Request("/api/calculate", {
        method: 'post', 
        body: JSON.stringify({price:this.state.currentprice, tax: tax_multiplier, discount: discount/100}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
      })
      fetch(request)
      .then(
        (res)=>{
          if (res.status !== 200){
              alert("woops! error code:"+res.status);
          }else{
              return res.json()
          }
        }
      ) 
      .then(
        (res)=>{
          this.setState({finalprice: res.price, discount:discount})
        }
      )
    }

    render() {
        return (
                <div style={{padding:'80px 20px'}}>
                  <div class="col-md-8 col-xs-6 App-header-left font1" >Item </div>
                  <div class="col-md-4 col-xs-6 App-header-right font1" style={{top:"0px"}}>Count</div>
                  {this.state.itemlist.map(item => 
                    <div>
                      <div class="col-md-8 col-xs-12 App-header-left"><img src={item.item} alt={item.item} style={{width:'100px'}}/> &nbsp; ${item.price.toFixed(2)}</div>
                      <div class="col-md-4 col-xs-12 App-header-right"><input type="number" id="quantity" name="quantity" min="0" defaultValue="0" onChange={(e) => {this.handleCountUpdate(e, item.item)}}/></div>
                    </div>)
                  }
                  <div class="col-md-8 col-xs-6 App-header-left font1" ></div>
                  <div class="col-md-4 col-xs-6 App-header-right font1" style={{top:'0px'}}>
                    <div class="App-header-right" style={{top:'0px'}}>
                      <input type="checkbox" id="tax" name="tax" defaultChecked='True' onChange={(e) => {this.handleTaxChange(e)}}/>
                      <label for="tax" style={{fontWeight:200, color:'white', marginLeft:'15px'}}> Add taxes</label><br/>
                    </div>
                  </div>
                  <div class="col-md-4 col-xs-6 App-header-right font1" style={{ top:'0px'}}>
                    <div class="App-header-right" style={{top:'0px'}}>
                      Discount: <input type="number" id="discount" name="discount" min="0" defaultValue="0" onChange={(e) => {this.handleDiscountChange(e)}}/> %
                    </div>
                  </div>
                  <div class="col-md-8 col-xs-6 App-header-left font1" ></div>
                  <div class="col-md-4 col-xs-6 App-header-right font1" >Price Total <br/> ${this.state.finalprice.toFixed(2)}</div>
                  
                </div>
                )
    }


}


export default App;
