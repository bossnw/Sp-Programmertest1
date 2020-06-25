import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {list: '', 
                  keyword: '',
                  type: '1',
                  finalkeyword: '',
                  finallist:'',
                  finaltype: '',
                  showText: false
                 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) { //for update while typing
    this.setState({
      [e.target.name]: e.target.value
    })

  }
  handleSubmit(e) { //for save value when cilcking button 
    e.preventDefault();
    this.setState((state) => ({ // save it in to new variable
      finalkeyword: state.keyword,
      finallist: state.list ,
      finaltype: state.type 
    }))
    if(this.state.keyword != '' && this.state.list != '' ){ // condition for show output after fill list and keyword
      this.setState(() => ({
        showText: true 
      }))
    } 
    else{
      this.setState(() => ({
        showText: false  
      }))
    } 
  }
  binarysearch(intlist,keyword,low,high,count){ //binary search algorithm 
    count+=1
    var mid = Math.floor((low+high)/2)
    console.log(intlist.length)
    if (count < intlist.length) {
    if (intlist[mid] == keyword) {
      return <p>Round : {count} =={">"} {keyword} == {intlist[mid]} found !!</p> ;
    }
    else {
      if (intlist[mid] > keyword) {
        return [<p>Round : {count} =={">"} {keyword} != {intlist[mid]}</p>,this.binarysearch(intlist,keyword,low,mid-1,count)]       
      }
      else{
        return [<p>Round : {count} =={">"} {keyword} != {intlist[mid]}</p>,this.binarysearch(intlist,keyword,mid+1,high,count)]
      }
    }
    }
  }
  preparebinarysearch(list,keyword,low,high,count){ // change type to integer and sort data
    const intlist = [];
    list.map((item, index) => (
      intlist.push(parseInt(item,10))
    ));
    keyword= parseInt(keyword,10)
    intlist.sort(function(a, b) {
      return a - b;
    });
    return this.binarysearch(intlist,keyword,low,high,count)
  }
  preparebubblesearch(list,keyword){ // change type to integer
    const intlist = [];
    list.map((item, index) => (
      intlist.push(parseInt(item,10))
    ));
    return this.bubblesearch(intlist,keyword);
  }
  bubblesearch(intlist,keyword){ //bubble sort algorithm  
    const templist = [];
    var check = 0;
    console.log(intlist.length)
    for (let index = 0; index < intlist.length; index++) {
      if (intlist[index] > intlist[index+1]) {
        templist[index] = intlist[index]
        templist[index+1] = intlist[index+1]
        intlist[index] = templist[index+1]
        intlist[index+1] = templist[index]
        check += 1
      }
    }
    if (check == 0) {
      return [<spam>Bubble Sort Output :</spam>,intlist.map((item, index) => (
            (index == intlist.length-1)?
            <spam>{item}</spam>
            :<spam>{item},</spam>   
          ))]
    } 
    else {
      return this.bubblesearch(intlist,keyword);
    }
  }
  render(){  
    var change;
    var temp  ;
    var count = 0;
  return (
    <div className="page" style={{textAlign: 'center'}}>
      <div className="Input">
        <form onSubmit={this.handleSubmit}>
          <div className= "list">
          <label >
            List  :
            <input  type="text" name="list" value={this.state.list} onChange={this.handleChange} style={{paddingRight:150}}/>
          </label>
          </div>
          <div className= "search">
          <label >
            ค้นหา  :
            <input  type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} style={{marginRight:115}}/>
          </label>
          <input type="submit" value="ค้นหา" style={{backgroundColor: 'orange',color:'white',borderRadius: '5px'}}/>
          </div>
          <div className= "type">
            <p>
              ประเภทการค้นหา
            </p>
            <select name="type" onChange={this.handleChange} >
              <option selected value="1">Linear Search</option>
              <option value="2">Binary Search</option>
              <option value="3">Bubble Sort</option>
            </select>
          </div>
        </form>
      </div>
      <p>ผลลัพธ์</p>
      {this.state.showText && <div className="Output" style={{border: '1px solid black',marginRight:50,marginLeft:50}}>
        <div style={{color:'white'}}>
        {change = this.state.finallist.split(",")}
        </div>
        <p> List: [{this.state.finallist}] </p> 
        <p> Search: {this.state.finalkeyword} </p>
        <p>Result :::</p>
      {(() => {
        switch (this.state.finaltype) {
          case '1':  return  change.map((item, index) => ( //Liner Search Case
                        <p>
                          {(this.state.finalkeyword == item ? 
                            (temp = " ",<span>Round : {index+1} =={">"} {this.state.finalkeyword} == {item} found !!</span>)
                            : (temp == " ")?
                            ("")
                            : (<span>Round : {index+1} =={">"} {this.state.finalkeyword} != {item}</span>) 
                          )}
                        </p>
        ));
          case '2':  return this.preparebinarysearch(change,this.state.finalkeyword,0,change.length-1,count);//Binary Search Case
          case '3':  return this.preparebubblesearch(change,this.state.finalkeyword);//Bubble Sort Case
        }
      })()}        
      </div>}
    </div>
  );
}
}
export default App;
