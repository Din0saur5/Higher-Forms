
      const express = require('express');
      const bodyParser = require('body-parser');
      require("dotenv").config();
      const { createClient } = require('@supabase/supabase-js')
  
      const app = express();
      const PORT = process.env.PORT || 5001;
      
      const supabaseUrl = process.env.SUPABASE_URL
      const supabaseAnonKey = process.env.SECRET_ANON
       //connect your supabase account and sanitize variables
      //const supabase = createClient(supabaseUrl, supabaseAnonKey)

      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      // Define your API routes here
            // app.get('/', async (req, res) => {
            //     try {
            //       const { data, error } = await supabase.from("your-table").select()
            //       if (error) {
            //         throw error
            //       }
            //       res.json(data)
            //     } catch (error) {
            //       console.log(error)
            //       res.status(500).json({ error: 'Something went wrong' })
            //     }
            //   })
      app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
      });
    