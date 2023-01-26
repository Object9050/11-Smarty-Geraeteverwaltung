const express = require('express')
const bodyParser = require('body-parser') // nötig um req.body lesen zu können (Z.B. bei POST-Anfragen)
const app = express()
app.use(bodyParser.json());
const port = 3500

/// Test ob Server antwortet
// app.get('/*', (req, res) => {
//     res.send('Der Server antwortet auf get-Anfragen')
// })

/// Implementierung des echten Codes (unten nur Mockup)
// Daten im JSON Format (Map?)
const data = {
    "devices": [
        {
            "id": 1,
            "name": "Wohnzimmerlampe",
            "type": "light",
            "status": "on",
            "groupIds": [1, 2]
        },
        {
            "id": 2,
            "name": "Kühlschrank",
            "type": "fridge",
            "status": "off",
            "groupIds": [2]
        },
        {
            "id": 3,
            "name": "Thermostat",
            "type": "thermostat",
            "status": "auto",
            "groupIds": [1,3]
        }
    ],
    "groups": [
        {
            "id": 1,
            "name": "Wohnzimmer",
            "deviceIds": [1, 3]
        },
        {
            "id": 2,
            "name": "Küche",
            "deviceIds": [1, 2]
        },
        {
            "id": 3,
            "name": "Haustechnik",
            "deviceIds": [3]
        }
    ]
}

// Routen
app.get('/devices', (req, res) => {
    res.status(200).send(data.devices)
})

app.get('/device', (req, res) => {
    const deviceId = req.query.id
    const device = data.devices.find(d => d.id === parseInt(deviceId))
    if (!device) {
        res.status(404).send("Device not found")
    } else {
        res.status(200).send(device)
    }
})

app.get('/groups', (req, res) => {
    res.status(200).send(data.groups)
})

app.get('/group', (req, res) => {
    const groupId = req.query.id
    const group = data.groups.find(g => g.id === parseInt(groupId))
    if (!group) {
        res.status(404).send("Group not found")
    } else {
        res.status(200).send(group)
    }
})

app.post('/devices', (req, res) => {
    const newDevice = req.body
    const id = data.devices.length + 1
    const device = {id, ...newDevice}
    data.devices.push(device)
    res.status(201).send(device)
})

app.put('/device', (req, res) => {
    const deviceId = req.query.id
    const deviceIndex = data.devices.findIndex(d => d.id === parseInt(deviceId))
    if (deviceIndex === -1) {
        res.status(404).send("Device not found")
    } else {
        const updatedDevice = req.body
        updatedDevice.id = data.devices[deviceIndex].id
        data.devices[deviceIndex] = updatedDevice
        res.status(200).send(updatedDevice)
    }
})

app.delete('/device', (req, res) => {
    const deviceId = req.query.id
    const deviceIndex = data.devices.findIndex(d => d.id === parseInt(deviceId))
    if (deviceIndex === -1) {
        res.status(404).send("Device not found")
    } else {
        data.devices.splice(deviceIndex, 1)
        res.status(204).send()
    }
})

app.post('/groups', (req, res) => {
    const newGroup = req.body
    const id = data.groups.length + 1
    const group = {id, ...newGroup}
    data.groups.push(group)
    res.status(201).send(group)
})

app.put('/group', (req, res) => {
    const groupId = req.query.id
    const groupIndex = data.groups.findIndex(g => g.id === parseInt(groupId))
    if (groupIndex === -1) {
        res.status(404).send("Group not found")
    } else {
        const updatedGroup = req.body
        updatedGroup.id = data.groups[groupIndex].id
        data.groups[groupIndex] = updatedGroup
        res.status(200).send(updatedGroup)
    }
})

app.delete('/group', (req, res) => {
    const groupId = req.query.id
    const groupIndex = data.groups.findIndex(g => g.id === parseInt(groupId))
    if (groupIndex === -1) {
        res.status(404).send("Group not found")
    } else {
        data.groups.splice(groupIndex, 1)
        res.status(204).send()
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


/// Mockup Code
// GET-Route für alle Geräte
// app.get('/devices', (req, res) => {
//     res.status(200).send("Liste der Geräte");
// });

// // GET-Route für ein bestimmtes Gerät anhand seiner ID
// app.get('/device/:id', (req, res) => {
//     res.status(200).send(`Details des Geräts mit ID ${req.params.id}`);
// });

// // POST-Route zum Erstellen eines neuen Geräts
// app.post('/device', (req, res) => {
//     res.status(201).send("Gerät erfolgreich erstellt");
// });

// // PUT-Route zum Aktualisieren eines bestehenden Geräts
// app.put('/device/:id', (req, res) => {
//     res.status(200).send(`Gerät mit ID ${req.params.id} erfolgreich aktualisiert`);
// });

// // DELETE-Route zum Löschen eines bestehenden Geräts
// app.delete('/device/:id', (req, res) => {
//     res.status(200).send(`Gerät mit ID ${req.params.id} erfolgreich gelöscht`);
// });

// // DELETE-Route zum Löschen aller Geräte
// app.delete('/devices', (req, res) => {
//     res.status(200).send("Alle Geräte erfolgreich gelöscht");
// });

// // GET-Route für alle Gruppen
// app.get('/groups', (req, res) => {
//     res.status(200).send("Liste der Gruppen");
// });

// // GET-Route für eine bestimmte Gruppe anhand ihrer ID
// app.get('/group/:id', (req, res) => {
//     res.status(200).send(`Details der Gruppe mit ID ${req.params.id}`);
// });

// // POST-Route zum Erstellen einer neuen Gruppe
// app.post('/group', (req, res) => {
//     res.status(201).send("Gruppe erfolgreich erstellt");
// });

// // PUT-Route zum Aktualisieren einer bestehenden Gruppe
// app.put('/group/:id', (req, res) => {
//     res.status(200).send(`Gruppe mit ID ${req.params.id} erfolgreich aktualisiert`);
// });

// // DELETE-Route zum Löschen einer bestehenden Gruppe
// app.delete('/group/:id', (req, res) => {
//     res.status(200).send(`Gruppe mit ID ${req.params.id} erfolgreich gelöscht`);
// });

// // DELETE-Route zum Löschen aller Gruppen
// app.delete('/groups', (req, res) => {
//     res.status(200).send("Alle Gruppen erfolgreich gelöscht");
// });

// // Ausgabe, die bestätigt, dass der Server läuft und auf Anfragen lauscht
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// })