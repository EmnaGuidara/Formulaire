const form = require('../Models/Formulaire')
const Client = require('../Models/Client')
const forge = require('node-forge');
//const fetch = require('node-fetch');
require('dotenv').config();
/* 
exports.addForm = async (req, rep) => {
  try {
    const { referalUrl, content } = await req.body;
    console.log( referalUrl, content );
    
    const client = await Client.findOne({ referalUrl });
   
    if (!client) {
      console.log('b');
      return rep.status(404).send('client not found'); // Utilisez return pour éviter de continuer l'exécution du code
    }
    
    const privateKey = forge.pki.privateKeyFromPem(client.privateKey);
    const decryptedContent = forge.util.decodeUtf8(privateKey.decrypt(forge.util.decode64(content), 'RSA-OAEP'));
    console.log('c');
    const formulaire = new form({
      clientId: client._id,
      content: decryptedContent
    });
    await formulaire.save();
    await Client.findByIdAndUpdate(client._id, { $push: { formulaires: formulaire._id } });
    
    console.log('d');
    console.log(formulaire);
    return rep.status(200).send(formulaire); // Utilisez return pour éviter de continuer l'exécution du code

  } catch (error) {
    return rep.status(500).send(error); // Utilisez return pour éviter de continuer l'exécution du code
  }
}; */

exports.addForm = async (req, res) => {
  try {
    const { referalUrl, content } =await req.body;
    console.log( referalUrl, content)
    const client = await Client.findOne({ referalUrl });

    if (!client) {
      console.log('Client not found');
      return res.status(404).send('Client not found');
    }

    const privateKey = forge.pki.privateKeyFromPem(client.privateKey);
    const decryptedContent = forge.util.decodeUtf8(privateKey.decrypt(forge.util.decode64(content), 'RSA-OAEP'));

    const formulaire = new form({
      clientId: client._id,
      content: decryptedContent
    });
    await formulaire.save();
    await Client.findByIdAndUpdate(client._id, { $push: { formulaires: formulaire._id } });

    console.log('Form submitted:', formulaire);
    return res.status(200).send(formulaire);

  } catch (error) {
    console.error('Error processing form:', error);
    return res.status(500).send(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const formulaire = await Formulaire.findById(id).populate('clientId');

    if (!formulaire) {
      return res.status(404).send('Formulaire not found');
    }

    res.status(200).send(formulaire);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const formulaire = await form.findById(id).populate('Client_id');
    if (!formulaire) {
      return res.status(404).send('Formulaire not found');
    }
    const client = formulaire.Client_id;
    const publicKey = forge.pki.publicKeyFromPem(client.publicKey);
    const encryptedContent = forge.util.encode64(publicKey.encrypt(forge.util.encodeUtf8(content)));
    formulaire.content = encryptedContent;
    await formulaire.save();
    res.status(200).send(formulaire);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const formulaire = await form.findByIdAndDelete(id);
    if (!formulaire) {
      return res.status(404).send('Formulaire not found');
    }
    await Client.findByIdAndUpdate(formulaire.Client_id, { $pull: { formulaires: formulaire._id } });
    res.status(200).send('Formulaire deleted');
  } catch (error) {
    res.status(500).send(error);
  }
};