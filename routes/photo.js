const date = require('date-and-time')

module.exports = function(photo,knex){
photo.get('/search/:album_name/:photo_id', (req, res, next) => {
    var album_name = request.params.album_name;
    var photo_name = request.params.photo_id;
    var query = knex.select('*').from('album_name').where('id', photo_id).then((photo) => {
      console.log("\nCategory:\n", photo);
      return res.json(photo);
    });
  });

  var shoppingCart_details = request.body;
  shoppingCart_details['added_on'] = new Date();

photo.delete('/:photo_id',(request, response,next) => {
    var photo_id = request.params.photo_id;
    var query = knex.select('*').from(''.where('id',photo_id).del().then(() => {
        console.log("sucessfully deleted")
    }))
});

photo.post('/like/:photo_id',(req,res,next) => {
    knex.select('like').from('').where('id',photo_id).then(() => {
        like = like +1
        res.send(like)
        
    })
})
}