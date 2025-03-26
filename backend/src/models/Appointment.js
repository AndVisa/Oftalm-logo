const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    name: {
      type: String,
      required: [true, 'El nombre del paciente es requerido'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido']
    }
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  time: {
    type: String,
    required: [true, 'La hora es requerida']
  },
  type: {
    type: String,
    required: [true, 'El tipo de cita es requerido'],
    enum: ['consulta', 'examen', 'ajuste', 'otro']
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
    default: 'pendiente'
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Índices para mejorar el rendimiento de las búsquedas
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ 'patient.email': 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 