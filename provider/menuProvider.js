import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config'
import { doc, getDoc, collection, query, where, getDocs, listCollections } from "firebase/firestore";
import { db } from '../firebase/config';
export const MenuContext = createContext(undefined);

export const MenuProvider = ({ children }) => {

  let menuItemsToDisplay = []
  
  const [menu, setMenu] = useState([{ section: '', subSections: [{ title: '', data: [] }] }])

 

  const addMenuSubSection = (data, currentSubSections, menuSection, menuItem, menuMainSection) => {
    menuSection.title = data.category
    if (currentSubSections.find(item => item.title === menuSection.title)) { //category exists 
      //  console.log('exists')
      currentCategoryData = currentSubSections.find(item => item.title === menuSection.title).data
      if (!currentCategoryData.find(item => item.name === data.name)) {
        menuItem.name = data.name;
        menuItem.price = '$' + data.price
        if(data.description){ menuItem.description=data.description}
        if(data.rating){ menuItem.rating=data.rating}
       if(data.reviews){ menuItem.reviews=data.reviews}
       if(data.image){ menuItem.image=data.image}
       
        currentSubSections.find(item => item.title === menuSection.title).data = [...currentCategoryData, menuItem]
        // console.log(menuItemsToDisplay.find(item => item.title === menuSection.title).data)
        setMenu(menuItemsToDisplay)
        //  console.log('Adding non existent item',  currentSubSections.find(item => item.title === menuSection.title).data)
      }
    } else { //category doesn't exist
      // console.log(data)
      menuItem.name = data.name;
      menuItem.price = '$' + data.price
      if(data.description){ menuItem.description=data.description}
      if(data.rating){ menuItem.rating=data.rating}
      if(data.image){ menuItem.image=data.image}
     if(data.reviews){ menuItem.reviews=data.reviews}
     menuSection.title = data.category
      menuSection.data = [menuItem]
      menuMainSection.subSections = [menuSection]
      //  console.log('doenst exist', menuItem)
      menuItemsToDisplay.find(item => item.section === menuMainSection.section).subSections = [...currentSubSections, menuSection]
      // menuItemsToDisplay=[...menuItemsToDisplay,menuSection]
      setMenu(menuItemsToDisplay)
    }
  }

  const addMenuSection = (data, sectionTitle) => {
    // console.log(doc.data())
    let currentCategoryData = []
    let currentSubSections = []
    let menuMainSection = { section: '', subSections: [{ title: '', data: [] }] }
    let menuItem = { name: '', price: '' }
    let menuSection = { title: '', data: [] }
    menuMainSection.section = sectionTitle
    menuSection.title = data.category;
    // console.log('initial ', menuItemsToDisplay) 
    if (menuItemsToDisplay.find(item => item.section === menuMainSection.section)) {
      currentSubSections = menuItemsToDisplay.find(item => item.section === menuMainSection.section).subSections
      // console.log('subsections',currentSubSections)
      addMenuSubSection(data, currentSubSections, menuSection, menuItem, menuMainSection)
    }
    else {
      menuItem.name = data.name;
      menuItem.price = '$' + data.price
      if(data.description){ menuItem.description=data.description}
      if(data.rating){ menuItem.rating=data.rating}
     if(data.reviews){ menuItem.reviews=data.reviews}
     if(data.image){ menuItem.image=data.image}
      menuMainSection.subSections = [{ title: menuSection.title, data: [menuItem] }]
      menuItemsToDisplay = [...menuItemsToDisplay, menuMainSection]
      setMenu(menuItemsToDisplay)
      // console.log('new section',menuItemsToDisplay)
    }
  }

  const fetchBeer = async () => {
    const querySnapshot = await getDocs(collection(db, "drinks", "Soft Drinks", 'Beer'));

    querySnapshot.forEach((doc) => {
      if (doc.data().category) {
        addMenuSection(doc.data(), 'Drinks');


        // console.log(menu.find(item => item.title === menuSection.title).data)
      }


    });


  }
  const fetchSoftDrinks = async () => {

    const querySnapshot = await getDocs(collection(db, "drinks", "Soft Drinks", 'Soft Drinks'));
    let currentCategoryData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().category) {
        // console.log('soft')
        addMenuSection(doc.data(), 'Drinks');

      }


    });


  }
  const fetchSpirits = async () => {

    const querySnapshot = await getDocs(collection(db, "drinks", "Soft Drinks", 'Spirits '));
    let currentCategoryData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().category) {
        addMenuSection(doc.data(), 'Drinks');
        // console.log(menu.find(item => item.title === menuSection.title).data)
      }


    });


  }
  const fetchWine = async () => {

    const querySnapshot = await getDocs(collection(db, "drinks", "Soft Drinks", 'Wines'));
    let currentCategoryData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().category) {
        addMenuSection(doc.data(), 'Drinks');;

        // console.log(menu.find(item => item.title === menuSection.title).data)
      }


    });


  }
  const fetchEntree = async () => {

    const querySnapshot = await getDocs(collection(db, "recipes", "Food", 'Entrees'));
    let currentCategoryData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().category) {

        // console.log(doc.data())
        addMenuSection(doc.data(), 'Entrees');;

      }


    });


  }
  const fetchMains = async () => {

    const querySnapshot = await getDocs(collection(db, "recipes", "Food", 'Mains'));
    let currentCategoryData = []
    querySnapshot.forEach((doc) => {
      if (doc.data().category) {

        addMenuSection(doc.data(), 'Mains');;

      }


    });


  }
  const fetchDesserts = async () => {

    const querySnapshot = await getDocs(collection(db, "recipes", "Food", 'Desserts'));

    querySnapshot.forEach((doc) => {
      if (doc.data().category) {



        addMenuSection(doc.data(), 'Desserts');;

      }


    });
 

  }
  const setCount = () => {
    let countItems = []  
    menu.map(item => {
      let newCount = 0
      // console.log(item.section)

      item.subSections.map(sec => {

        newCount = newCount + sec.data.length;


      })

      if (countItems.find(counted => counted.title === item.title)) {
        const count = countItems.find(counted => counted.title === item.title).count
        countItems.find(counted => counted.title === item.title).count = count + newCount
      }
      else if (newCount>0) {
        countItems.push({ title: item.section, count: newCount })
      }
      
    })
    //  console.log('counting',countItems)
  return countItems

  }
  

const mostPopular= ()=>{
  const arr=[]
  const arrMax=[]
  let maxRating;
  let maxReviews;
  let popular={};
  menu.map(item => {
     
    
    item.subSections.map(sec => {
      // console.log(sec)
      sec.data.map(o=>{
       if(o.rating&&o.reviews){
        arr.push(o)
       }
      })
 

    })
    
  })
    maxRating=Math.max(...arr.map(o => o.rating))  
    arr.map(o=>{
      if(o.rating===maxRating){
        arrMax.push(o)
      }
    })  
    // console.log(arrMax)

    maxReviews=Math.max(...arrMax.map(o => o.reviews))
    // console.log(maxReviews)
    popular=arrMax.find(item=>item.reviews=maxReviews); 
     return popular

} 

const randomPopular= ()=>{
  const arr=[]
  let arrMax=[] 
  let maxRating;
  let maxReviews;
  let popular={};
  menu.map(item => {
     
    
    item.subSections.map(sec => {
      // console.log(sec)
      sec.data.map(o=>{
       if(o.rating&&o.reviews){
        arr.push(o)
       }
      })
 

    })
    
  })
    maxRating=Math.max(...arr.map(o => o.rating))
    arr.map(o=>{
      if(o.rating>=maxRating-0.6 && o.reviews>10){
        arrMax.push(o)
      }
    })
    maxReviews=Math.max(...arrMax.map(o => o.reviews))
     
    
     return arrMax.find(item=>item.reviews!=maxReviews); 

}

const setPopular= ()=>{
  const arr=[]
  let arrMax=[] 
  let maxRating;
  let maxReviews;
  let popular={};
  menu.map(item => {
     
    
    item.subSections.map(sec => {
      // console.log(sec)
      sec.data.map(o=>{
       if(o.rating&&o.reviews){
        arr.push(o)
       }
      })
 

    })
    
  })
    maxRating=Math.max(...arr.map(o => o.rating))
    arr.map(o=>{
      if(o.rating>=maxRating-0.6 && o.reviews>10){
        arrMax.push(o)
      }
    })
    maxReviews=Math.max(...arrMax.map(o => o.reviews))
     
    return [{ title: 'Popular Dishes', data: arrMax }]
   

}

const foodCategories=setCount();
const Popular=mostPopular();
const randomPop=randomPopular();
// console.log('fetch variables')

useEffect(() => {
// console.log('fetch menu called')
  fetchEntree();
  fetchMains();
  fetchDesserts(); 
  fetchBeer();
  fetchSoftDrinks(); 
  fetchSpirits();
  fetchWine();

}, []);

   
const setLoaded= ()=>{

     if(menu.length>0 ){
      // console.log('true')
      return true 
     }else{
      // console.log('false')

      return false
     }
     

   

}





  return (
    <MenuContext.Provider
      value={{ menu,setCount,mostPopular,randomPopular,foodCategories,randomPop,Popular,setPopular,setLoaded }}>
      {children}
    </MenuContext.Provider>  
  );
};

export const useMenu = () => useContext(MenuContext)



