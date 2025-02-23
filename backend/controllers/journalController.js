const {journalModel} = require('../models/journalSchema');

const getJournalbyId = async (req, res) => {
  try {
    const id = req.body.id;
    const journal = await journalModel.findOne({ _id: id });
    if (journal && journal.image && journal.image.data) {
      const imgBase64 = journal.image.data.toString('base64');
      // Overwrite the image field with a data URL string.
      journal.image.data = `data:${journal.image.contentType};base64,${imgBase64}`;
    }
    return res.status(200).json({ error: false, message: journal });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
};

const getUserJournal = async (req, res) => {
    try{ 
        const journals = await journalModel.find({userName: req.user.userName});
        return res.status(200).json({error:false, message:journals});
    }
    catch(err){
        res.status(500).json({error:true, message:err.message});
    }
}


const addJournal = async (req, res) => {
    try {
      const { id, title, description, country, journalContent, author } = req.body;
      const userName = req.user.userName;
      let existingJournal;
      let image = null;
  
      // Check if an image file was uploaded
      if (req.file) {
        image = {
          data: req.file.buffer,       // store the binary data
          contentType: req.file.mimetype // store the file's MIME type
        };
      }
  
      if (id) {
        existingJournal = await journalModel.findById(id);
      }
  
      if (existingJournal) {
        existingJournal.title = title;
        existingJournal.description = description;
        existingJournal.country = country;
        existingJournal.journalContent = journalContent;
        // Only update the image if a new file is provided
        if (image) {
          existingJournal.image = image;
        }
        existingJournal.author = author;
        await existingJournal.save();
  
        return res.status(200).json({ error: false, message: "Journal Updated" });
      } else {
        await journalModel.create({
          title,
          description,
          country,
          journalContent,
          author,
          userName,
          image,  // This can be null if no file was uploaded
        });
        return res.status(200).json({ error: false, message: "Journal Added" });
      }
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  };
const updateJournal = async(req,res)=>{
    try{
       const username = req.body.userName;
       const title = req.body.title;
       const description = req.body.description;
       const country=req.body.country;
       const journalContent = req.body.journalContent;
       if (req.file) {
        image = {
          data: req.file.buffer,
          contentType: req.file.mimetype
        };
        // Then update the document accordingly.
      }
      
       const author = req.body.author;
       const doc = await journalModel.updateOne({userName:username,title:title})
    }catch(err){
       console.log(err)
    }
}

const deleteJournal = async(req,res)=>{
    const userName = req.body.userName;
    const title = req.body.title;
    try{
    const doc = await journalModel.deleteOne({userName:userName,title:title});
    return res.status(200).json({error:false,message:"successfully deleted"})
    }catch(err){
        return res.status(404).json({error:true,message:"deletion failed"})
    }
}

const getJournals = async (req, res) => {
  try {
    const journals = await journalModel.find({});
    const journalsWithImages = journals.map(journal => {
      if (journal.image && journal.image.data && journal.image.data.data) {
        // Convert the nested array of numbers to a Buffer
        const imageBuffer = Buffer.from(journal.image.data.data);
        const base64String = imageBuffer.toString('base64');
        journal.image = `data:${journal.image.contentType || 'image/jpeg'};base64,${base64String}`;
        console.log(journal.image)
      }
      return journal;
    });
    return res.status(200).json({ error: false, journals: journalsWithImages });
  } catch (error) {
    return res.status(500).json({ error: true, message: error.message });
  }
};


module.exports = { addJournal, getJournals, getUserJournal, getJournalbyId,updateJournal,deleteJournal }