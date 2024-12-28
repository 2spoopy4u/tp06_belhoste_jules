
exports.get = (req, res) => {
        const catalogue = [
		{ref:"X001", libelle : "Linux", prix : 10},
		{ref:"X002", libelle : "Angular", prix : 20}
		];
		
	
	res.setHeader('Content-Type', 'application/json');
      
    res.send(catalogue);
   };    

