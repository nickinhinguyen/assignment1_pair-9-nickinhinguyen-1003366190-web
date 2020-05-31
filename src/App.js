import React from 'react';
import './App.css';

// the Sign up page
class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleCountUpdate.bind(this);
        this.state = {
          itemlist:[
            {item:"/images/item1.jpg",price:20.98, count:0}, 
            {item:"/images/item2.jpg",price:30.88, count:0},
            {item:"/images/item3.jpg",price:30.88, count:0},
            {item:"/images/item4.jpg",price:30.88, count:0},
            {item:"/images/item5.jpg",price:30.88, count:0},
            {item:"/images/item6.jpg",price:30.88, count:0},
          ],
          currentprice: 0,
          error: false,
          errormessage: null,  
          addtax: true,
        }
    }
    handleCountUpdate(e, itemname){
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
        if (this.state.addtax){
            price*=1.13
        }
        this.setState({itemlist: item_list_copy, currentprice:price})
    }
    handleTaxChange(e){
        let prev_tax_option = this.state.addtax;
        let price = 0;
        if (prev_tax_option){
            price = this.state.currentprice / 1.13;
        }else{
            price = this.state.currentprice * 1.13;
        }
        
        this.setState({currentprice: price, addtax:!prev_tax_option})
    }


    render() {
        return (
                <div style={{padding:'80px 20px'}}>
                  <div class="col-md-8 col-xs-6 App-header-left" style={{fontSize:'calc(14px + 2vmin)', color:'white'}}>Item </div>
                  <div class="col-md-4 col-xs-6 App-header-right" style={{fontSize:'calc(14px + 2vmin)', color:'white', top:"0px"}}>Count</div>
                  {this.state.itemlist.map(item => 
                    <div>
                      <div class="col-md-8 col-xs-12 App-header-left"><img src={item.item} alt={item.item} style={{width:'100px'}}/> &nbsp; ${item.price.toFixed(2)}</div>
                      <div class="col-md-4 col-xs-12 App-header-right"><input type="number" id="quantity" name="quantity" min="0" max="5" defaultValue="0" onChange={(e) => {this.handleCountUpdate(e, item.item)}}/></div>
                    </div>)
                  }
                  <div class="col-md-8 col-xs-6 App-header-left" style={{fontSize:'calc(14px + 2vmin)', color:'white'}}></div>
                  <div class="col-md-4 col-xs-6 App-header-right" style={{fontSize:'calc(14px + 2vmin)', color:'white', top:'0px'}}>
                    <div class="App-header-right" style={{top:'0px'}}>
                      <input type="checkbox" id="tax" name="tax" defaultChecked='True' onChange={(e) => {this.handleTaxChange(e)}}/>
                      <label for="tax" style={{fontWeight:200, color:'white', marginLeft:'15px'}}> Add taxes</label><br/>
                    </div>
                  </div>
                  <div class="col-md-8 col-xs-6 App-header-left" style={{fontSize:'calc(14px + 2vmin)', color:'white'}}></div>
                  <div class="col-md-4 col-xs-6 App-header-right" style={{fontSize:'calc(14px + 2vmin)', color:'white', top:"0px"}}>Price Total <br/> ${this.state.currentprice.toFixed(2)}</div>
                  
                </div>
                )
    }


}


export default App;
