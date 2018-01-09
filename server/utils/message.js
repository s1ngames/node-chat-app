var generateMessage = (from , text)=>{
return {
  from,
  text,
  createAt:new Date().getTime()
}
};


var generateLocationMessage = (from,lat,lon)=>{
  return{
    from,
    url:`https://www.google.com/maps?=${lat},${lon}`,
    createAt : new Date().getTime()
  };
};

module.exports ={generateMessage,generateLocationMessage};
