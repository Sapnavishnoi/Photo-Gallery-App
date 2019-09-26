
    // customer.get('/',(req,res,next)=>{
    //     res.send('9999999999999')
    // })

module.exports = function(user,knex,jwt,config){
    // 1 CREATE A NEW CUSTOMER
    user.post('/user',(req,res,next)=>{
    var email = req.body.email
    var customer = {
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    knex('user').insert(customer).then(()=>{            
        console.log('done!!!!!!!!!!')
    
    })
    knex('user').where('email',email).select('*').then((customerdetail) => {
        let token = jwt.sign(customer,
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
          );
        console.log(customerdetail[0])
        res.send({customer:customerdetail[0],
            accessToken: "Bearer " + token,
            expires_in: '24h'})
        
    })
    

})

user.post("/login",(request,response,next)=>{
    var email = request.body.email;
    console.log(email)
    var password = request.body.password;
    console.log(password)
    
    var bearerHeader = request.headers['authorization'];
    var token;
    console.log(bearerHeader);
    request.authenticated = false;
    if (bearerHeader){
        var bearer = bearerHeader.split(" ");
        token = bearer[1];
    knex('user').where('email',email).select('*').then((loginData) => {
        jwt.verify(token, config.secret, (err, decoded) =>{
            if (err){
                console.log(err);
                request.authenticated = false;
                request.decoded = null;
                next(); 
            } else {
                if (decoded.email==email && decoded.password==password){
                    response.send({customer:loginData[0],
                                    accessToken: "Bearer" +token,
                                    expires_in: '24h'}) 
                }else if(decoded.email === email){
                    response.send("please check your password....!")
                }
                else{
                    response.send("check your email and password","email-"+email,"password-"+password)
                }
            }

        })
        });
    }
});

}
    

