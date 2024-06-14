const Client = require('../Models/Client');
const forge = require('node-forge');

exports.addClient = async (req, rep) => {
  try {
    console.log(req)
    const { name, referalUrl, status } = req.body
    const { privateKey, publicKey } = await generateKeys();
      
    const client = new Client({
      name,
      referalUrl,
      status,
      formulaires: [],
      privateKey,
      publicKey
    });
    await client.save();
    
    rep.status(200).send(client)
    
  } catch (error) {
    rep.status(500).send(error)
  }
}

exports.getClientAndForms = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id).populate('formulaires');
    if (!client) {
      return res.status(404).send('Client not found');
    }
    const privateKey = forge.pki.privateKeyFromPem(client.privateKey);

    const decryptedFormulaires = client.formulaires.map(formulaire => {
      const decryptedContent = forge.util.decodeUtf8(privateKey.decrypt(forge.util.decode64(formulaire.content)));
      return {
        ...formulaire.toObject(),
        content: decryptedContent
      };
    });

    const clientWithDecryptedForms = {
      ...client.toObject(),
      formulaires: decryptedFormulaires
    };

    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getClientKey=async (req, res) => {
  const referalUrl = req.query.referalUrl;
  // Recherche du client par referalUrl et envoi de la clé publique
  try {
      const client = await Client.findOne({ referalUrl });
      if (!client) {
          return res.status(404).send('Client not found');
      }
      res.json({ publicKey: client.publicKey }); // Retourne la clé publique en format PEM
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
};
exports.getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).send('Client not found');
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const client = await Client.findByIdAndUpdate(id, updates, { new: true });
    if (!client) {
      return res.status(404).send('Client not found');
    }
    res.status(200).send(client);
  } catch (error) {
    res.status(500).send(error);
  }
};
/* exports.updateClientKey = async (req, res) => {
  try {
    const { id } = req.params;
    const client1=await Client.findById(id)
    const { privateKey, publicKey } = await generateKeys();
    const client = await Client.findByIdAndUpdate(id,{publicKey :publicKey, privateKey:privateKey,lastPrivateKeyUpdated:Date.now()},{ new: true } );

    if (!client) {
      return res.status(404).send('Client not found');
    }
    res.status(200).send(client, client1);
  } catch (error) {
    res.status(500).send(error);
  }
}; */
exports.updateClientKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { privateKey, publicKey } = await generateKeys();
    
    const client = await Client.findByIdAndUpdate(
      id,
      { publicKey, privateKey, lastPrivateKeyUpdated: Date.now() },
      { new: true }
    );

    if (!client) {
      return res.status(404).send('Client not found');
    }
    return res.status(200).send(client);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return res.status(404).send('Client not found');
    }
    res.status(200).send('Client deleted');
  } catch (error) {
    res.status(500).send(error);
  }
};

async function generateKeys() {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: 2048, workers: 2 }, (err, keypair) => {
      if (err) {
        reject(err);
      } else {
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
        resolve({ privateKey, publicKey }); // Assurez-vous de résoudre la promesse
      }
    });
  });
}