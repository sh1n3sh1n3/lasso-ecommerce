import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <section>
      <div className='container'>
        <h2>Pagamento efetuado com sucesso!</h2>
        <p>
          Parabéns pela sua compra! Seu pedido está sendo processado, e será embalado e enviado o
          mais rápido possível.
        </p>
        <br />
        <Link to='/order-history'>
          <button className='--btn --btn-primary'>Ver Status Do Pedido</button>
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
