import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
   const { manufacturer, year, model, limit, fuel } = filters;

   const headers = {
      'X-RapidAPI-Key': 'da5d04c245msha698dcd8d47b822p1c6d6djsnc1ec27faeebc',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
   }

   const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
      headers: headers,
   })

   // const response1 = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?city_mpg=18&class=undefined&combination_mpg=20&cylinders=6&displacement=3.3&drive=rwd&highway_mpg=25&transmission=a&make=kia&year=2022&model=stinger rwd&limit=&fuel_type=gas`, {
   //    headers: headers,
   // })

   const result = await response.json();

   return result;
}

export async function fetchCartList(name: string) {
   return await fetch("https://dbaxl21nxc.execute-api.ap-southeast-2.amazonaws.com/getuserlist", {
      method: "POST",
      body: JSON.stringify({
         name: name,
      }),
   })
      .then(response => response.json())
      .then((data) => { return data; })
      .catch(error => console.log('Error while fetching:', error));
}

export async function addCartList(name: any, list: string) {
   return await fetch("https://dbaxl21nxc.execute-api.ap-southeast-2.amazonaws.com/adduserlist", {
      method: "POST",
      body: JSON.stringify({
         name: name,
         list: list,
      }),
   })
      .then(response => response.json())
      .then((data) => { return data; })
      .catch(error => console.log('Error while fetching:', error));
}

export async function fetchUser(username: string, password: string) {
   return await fetch("https://dbaxl21nxc.execute-api.ap-southeast-2.amazonaws.com/getuser", {
      method: "POST",
      body: JSON.stringify({
         username: username,
         password: password
      }),
   })
      .then(response => response.json())
      .then((data) => {
         window.localStorage.setItem('name', data);
         return data;
      })
      .catch(error => console.log('Error while fetching:', error));
}

async function checkUser(username: string, name: string) {
   let result;
   await fetch("https://dbaxl21nxc.execute-api.ap-southeast-2.amazonaws.com/adduser", {
      method: "GET",
   })
      .then(response => response.json())
      .then((data) => {
         for (let i = 0; i < data.length; i++) {
            if (data[i].username === username)
               return alert("User Name is alredy")
            if (data[i].name === name)
               return alert("Full Name is alredy")

            result = true;
         }
      })
      .catch(error => console.log('Error while fetching:', error));
   return result;
}

export async function addUser(username: string, password: string, name: string) {
   const result = await checkUser(username, name);
   if (result) {
      return await fetch("https://dbaxl21nxc.execute-api.ap-southeast-2.amazonaws.com/adduser", {
         method: "POST",
         body: JSON.stringify({
            username: username,
            password: password,
            name: name
         }),
      })
         .then(response => response.json())
         .then((data) => {
            window.localStorage.setItem("name", name);
            return data;
         })
         .catch(error => console.log('Error while fetching:', error));
   }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
   const basePricePerDay = 50;
   const mileageFactor = 0.1;
   const ageFactor = 0.05;

   const mileageRate = city_mpg * mileageFactor;
   const ageRate = (new Date().getFullYear() - year) * ageFactor;

   const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

   return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
   const url = new URL('https://cdn.imagin.studio/getimage');

   const { make, year, model } = car;

   url.searchParams.append('customer', 'hrjavascript-mastery');
   url.searchParams.append('make', make);
   url.searchParams.append('modelFamily', model.split(' ')[0]);
   url.searchParams.append('zoomType', 'fullscreen');
   url.searchParams.append('modelYear', `${year}`);
   url.searchParams.append('angle', `${angle}`);

   return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
   const searchParams = new URLSearchParams(window.location.search);

   searchParams.set(type, value);

   const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

   return newPathname;
}