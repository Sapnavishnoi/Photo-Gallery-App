

// --------------------------------------------------------
module.exports = function(album, knex) {
    album.get('/', (req, res, next) => {
      var query = knex.select('*').from('album').then((albumList) => {
        console.log("\n Album List:\n", albumList);
        response.json(albumList);
      });
    });


    album.get('/:albumName', (req, res, next) => {
        var album_id = req.params.album_id;
        var query = knex.select('*').from('album').where('album_id', album_id).then((album) => {
          if (album.length == 0) {
            var errMsg = {
              "error": {
                "status": 400,
                "code": "DEP_02",
                "message": "Don'exist album with this ID.",
                "field": "album_id"
              }
            }
            console.log("\nAlbum:\n", "Don'exist album with this name.");
            return res.json(errMsg);
          }
          console.log("\nAlbum:\n", album[0]);
          response.json(album);
    
        });
      });
    
    
    
// ----------------------------------------------------

album.post('/createAlbum/:albumName',(req,res,next) => {
    var albumName = req.body.albumName
    var sql = 'IF (NOT EXISTS (CREATE TABLE ${albumName} (album_id INT NOT NULL AUTO_INCREMENT,photo VARCHAR(100) NOT NULL,like INT DEFAULT 0 ,PRIMARY KEY ( album_id )));'
    knex('album').insert(albumName).then(()=>{
        connsole.log("sucessfully created album")
    })
    
    
})

album.delete('/deleteAlbum/:albumName',(req,res,next) => {
    var albumName = req.body.albumName;
    knex('album').where('albumName',albumName).del().then(() => {
        console.log("Album deleted")
    })

})

}
