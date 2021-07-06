
export default class OrilService {
  


    getResource = async (url) => {
      const res = await fetch(url)
        if(!res.ok){
          throw new Error(`Could not fetch ${url} , received ${res.status } `)
        }
      const body = await res.json()
      return body
    }
  
    getAllPeople = async() => {
      const res =  await this.getResource("https://oril-coins-test.herokuapp.com/list")
      return res.map(this._transformDate)
    }
  
    getPerson = async(id) => {
      const people =  await this.getResource(`https://oril-coins-test.herokuapp.com/item/${id}`)
       const res = this._sortByDate(people.data.map(this._transformPeople))
       return res
    }

    _formatDate = (date,a = false) => {
      let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
      let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
      let yy = date.getFullYear() ;
        if (yy < 10) yy = '0' + yy;
      if(!a){
      
        return dd + '.' + mm + '.' + yy;
        }
        
        else{
          var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        
          let day = date.getDay()
          let h = date.getHours()
          if (h < 10) h = '0' + h;
          let m = date.getMinutes()
          if (m < 10) m = '0' + m;
          let s = date.getSeconds()
          if (s < 10) s = '0' + s;

        return days[day] + " "+ dd + "." + mm +"."+ yy.toString().slice(-2) +" " +h+":"+m+":"+s;
        }
      }
    
    _sortByDate =(arr) => {
      return arr.sort((a, b) => a.date > b.date ? 1 : -1);
    }

    _changeZero = (num) => {
      if(isNaN(num)){return 0 }
      return num
    }

    _transformDate = (dates) => {
        return {
            ...dates,
            createdAt: this._formatDate(new Date(dates.createdAt.slice(0,10))),
            date:(Date.parse(dates.createdAt))
        }
    }
    
    _transformPeople = (people) => {
      return {
        ...people,
        curency:this._changeZero(+people.curency),
        date:(Date.parse(people.date)),
        formatDate:this._formatDate(new Date(people.date.slice(0,-1)),true)
      }
    }

    _transformBack = (people) => {
      return {
        ...people,
        date:this._formatDate(new Date(people.date)),
        formatDate:people.date.slice(-1)
      }
    }

}