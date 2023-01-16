const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
	try {
		const { title, tags, body } = request.payload
		const id = nanoid(16)
		const createdDate = new Date().toISOString()
		const updatedAt = createdDate
		const newNotes = { title, tags, body, id, createdDate, updatedAt }

		notes.push(newNotes)

		const isSuccess = notes.find(e => e.id === id)

		response = h.response({
			status: isSuccess ? 'Success' : 'fail',
			message: isSuccess ? 'Catatan berhasil ditambahkan' : 'Catatan gagal ditambahkan',
			data: {
				noteId: id
			}
		})

		return response
	} catch (error) {

	}
};

const getAllNotesHandler = (request, h) => {
	try {

		response = h.response({
			status: 'Success',
			data: {
				notes
			}
		})

		return response
	} catch (error) { }
};

const getNoteByIdHandler = (request, h) => {
	try {
		const { id } = request.params

		const note = notes.find((n) => n.id === id)

		response = h.response({
			status: note ? 'Success' : 'Fail',
			message: !note && 'Catatan tidak ditemukan',
			data: {
				note
			}
		})

		if (!note) response.code(404)

		return response
	} catch (error) { }
};

const editNoteByIdHandler = (request, h) => {
	try {
		const { id } = request.params;

		const { title, tags, body } = request.payload;

		const updatedAt = new Date().toISOString();

		const index = notes.findIndex((note) => note.id === id);

		notes[index] = {
			...notes[index],
			title, tags, body, updatedAt
		}

		response = h.response({
			status: index >= 0 ? 'Success' : 'Fail',
			message: index >= 0 ? 'Catatan berhasil diperbarui' : 'Gagal memperbarui catatan. Id tidak ditemukan',
		})

		if (index < 0) response.code(500)

		return response
	} catch (error) { }
};

const deleteNoteByIdHandler = (request, h) => {
	try {
		const { id } = request.params;

		const note = notes.findIndex((n) => n.id === id)

		if (note >= 0) notes.splice(note, 1)

		response = h.response({
			status: note >= 0 ? 'Success' : 'Fail',
			message: note >= 0 ? 'Catatan berhasil diperbarui' : 'Gagal memperbarui catatan. Id tidak ditemukan',
		})

		if (note < 0) response.code(500)

		return response
	} catch (error) { }
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler }