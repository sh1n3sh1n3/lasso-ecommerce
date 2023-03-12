import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveUserBillingAddress, saveUserShippingAddress } from '../../redux/slices/checkoutSlice';

import { Card } from '../../components';

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
  const [shippingUserAddress, setShippingUserAddress] = useState({ ...initialAddressState });
  const [billingUserAddress, setBillingUserAddress] = useState({ ...initialAddressState });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserShippingAddress = (e) => {
    const { name, value } = e.target;
    setShippingUserAddress({ ...shippingUserAddress, [name]: value });
  };

  const handleUserBillingAddress = (e) => {
    const { name, value } = e.target;
    setBillingUserAddress({ ...billingUserAddress, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(saveUserShippingAddress(shippingUserAddress));
    dispatch(saveUserBillingAddress(billingUserAddress));

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
                value={shippingUserAddress.name}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Rua/Longradouro</label>
              <input
                type='text'
                placeholder='Rua/Longradouro'
                name='lineOne'
                value={shippingUserAddress.lineOne}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Ponto de Referência</label>
              <input
                type='text'
                placeholder='Ponto de Referência'
                name='lineTwo'
                value={shippingUserAddress.lineTwo}
                onChange={(e) => handleUserShippingAddress(e)}
              />
              <label>Cidade</label>
              <input
                type='text'
                placeholder='Cidade'
                name='city'
                value={shippingUserAddress.city}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Estado</label>
              <input
                type='text'
                placeholder='Estado'
                name='state'
                value={shippingUserAddress.state}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>CEP</label>
              <input
                type='text'
                placeholder='CEP'
                name='postalCode'
                value={shippingUserAddress.postalCode}
                onChange={(e) => handleUserShippingAddress(e)}
                required
              />
              <label>Número para Contato</label>
              <input
                type='text'
                placeholder='Telefone / Celular'
                name='phone'
                value={shippingUserAddress.phone}
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
                value={billingUserAddress.name}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Rua/Longradouro</label>
              <input
                type='text'
                placeholder='Rua/Longradouro'
                name='lineOne'
                value={billingUserAddress.lineOne}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Ponto de Referência</label>
              <input
                type='text'
                placeholder='Ponto de Referência'
                name='lineTwo'
                value={billingUserAddress.lineTwo}
                onChange={(e) => handleUserBillingAddress(e)}
              />
              <label>Cidade</label>
              <input
                type='text'
                placeholder='Cidade'
                name='city'
                value={billingUserAddress.city}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Estado</label>
              <input
                type='text'
                placeholder='Estado'
                name='state'
                value={billingUserAddress.state}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>CEP</label>
              <input
                type='text'
                placeholder='CEP'
                name='postalCode'
                value={billingUserAddress.postalCode}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <label>Número Para Contato</label>
              <input
                type='text'
                placeholder='Telefone / Celular'
                name='phone'
                value={billingUserAddress.phone}
                onChange={(e) => handleUserBillingAddress(e)}
                required
              />
              <button className='--btn --btn-primary' type='submit'>
                Confirmar e Continuar
              </button>
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
