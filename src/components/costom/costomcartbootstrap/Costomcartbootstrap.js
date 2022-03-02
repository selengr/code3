import React from 'react';
import cellEditFactory from 'react-bootstrap-table2-editor';


const Costomcartbootstrap = () => {


    

    return (
        <div>
            
                <BootstrapTable
                keyField="id"
                data={ products }
                columns={ columns }
                cellEdit={ cellEditFactory({ mode: 'click' }) }
            />

        </div>
    );
}

export default Costomcartbootstrap;
