import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveUserBillingAddress, saveUserShippingAddress } from '../../redux/slices/checkoutSlice';

import { Card, CheckoutSummary } from '../../components';

import styles from './CheckoutDetails.module.scss';

const initialAddressState = {
  name: '',
  lineOne: '',
  lineTwo: '',
  city: '',
  state: '',
  postalCode: '',
  phone: '',
};

const CheckoutDetails = () => {
  const [userShippingAddress, setShippingUserAddress] = useState({ ...initialAddressState });
  const [userBillingAddress, setBillingUserAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserShippingAddress = (e) => {
    const { name, value } = e.target;
    setShippingUserAddress({ ...userShippingAddress, [name]: value });
  };

  const handleUserBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingUserAddress({ ...userBillingAddress, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(saveUserShippingAddress(userShippingAddress));
    dispatch(saveUserBillingAddress(userBillingAddress));

    navigate('/checkout');
  };

  return (
    <section>
      <div className={`container ${styles.container}`}>
        <h2>Prosseguir com a compra</h2>
        <form onSubmit={handleFormSubmit}>
          <div>
            {/* Shipping address */}
            <Card cardClass={styles.card}>
              <h3>Enereço de Entrega</h3>
              <label>Nome Para Entrega</label>
              <input
                type='text'
                placeholder='Nome Completo'
                name='name'
                value={userShippingAddress.name}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Rua/Longradouro</label>
              <input
                type='text'
                placeholder='Rua/Longradouro'
                name='lineOne'
                value={userShippingAddress.lineOne}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Ponto de Referência</label>
              <input
                type='text'
                placeholder='Ponto de Referência'
                name='lineTwo'
                value={userShippingAddress.lineTwo}
                onChange={(e) => handleUserShippingAddress(e)}
              />
              <label>Cidade</label>
              <input
                type='text'
                placeholder='Cidade'
                name='city'
                value={userShippingAddress.city}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Estado</label>
              <input
                type='text'
                placeholder='Estado'
                name='state'
                value={userShippingAddress.state}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>CEP</label>
              <input
                type='text'
                placeholder='CEP'
                name='postalCode'
                value={userShippingAddress.postalCode}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Número para Contato</label>
              <input
                type='text'
                placeholder='Telefone / Celular'
                name='phone'
                value={userShippingAddress.phone}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
            </Card>
            {/* Billing address */}
            <Card cardClass={styles.card}>
              <h3>Enereço de Cobrança</h3>
              <label>Nome Para Cobrança</label>
              <input
                type='text'
                placeholder='Nome Completo'
                name='name'
                value={userBillingAddress.name}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Rua/Longradouro</label>
              <input
                type='text'
                placeholder='Rua/Longradouro'
                name='lineOne'
                value={userBillingAddress.lineOne}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Ponto de Referência</label>
              <input
                type='text'
                placeholder='Ponto de Referência'
                name='lineTwo'
                value={userBillingAddress.lineTwo}
                onChange={(e) => handleUserBillingAddress(e)}
              />
              <label>Cidade</label>
              <input
                type='text'
                placeholder='Cidade'
                name='city'
                value={userBillingAddress.city}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Estado</label>
              <input
                type='text'
                placeholder='Estado'
                name='state'
                value={userBillingAddress.state}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>CEP</label>
              <input
                type='text'
                placeholder='CEP'
                name='postalCode'
                value={userBillingAddress.postalCode}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Número Para Contato</label>
              <input
                type='text'
                placeholder='Telefone / Celular'
                name='phone'
                value={userBillingAddress.phone}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <button className='--btn --btn-primary' type='submit'>
                Confirmar e Continuar
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
