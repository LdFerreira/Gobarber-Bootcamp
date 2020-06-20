import AppError from '@shared/err/AppError';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('Should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createRepository = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointment = await createRepository.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('Should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createRepository = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createRepository.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createRepository.execute({
        date: appointmentDate,
        provider_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
