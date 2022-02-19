
import { accessSync } from 'fs';
import React, { useContext } from 'react'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { TransactionsContext } from '../../TransactionsContext';

import { Container } from "./styles";

export function Summary() {
    const { transactions } = useContext(TransactionsContext);

    const sumary = transactions.reduce((acc, transactions) => {
        if(transactions.type === 'deposit') {
            acc.deposits += transactions.amount;
            acc.total += transactions.amount;
        } else {  
            acc.withdraw += transactions.amount;
            acc.total -= transactions.amount;
        }

        return acc;

    }, {
        deposits: 0,
        withdraw: 0,
        total: 0,
    })

    return (
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    }).format(sumary.deposits)}
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Entradas" />
                </header>
                <strong>
                 {new Intl.NumberFormat('pT-BR', {
                     style: 'currency',
                     currency: 'BRL',
                    }).format(-sumary.withdraw)}   
                </strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Entradas" />
                </header>
                <strong>
                {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    }).format(sumary.total)}
                </strong>
            </div>

        </Container>
    )
}