'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidatorContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = (req, res, next) => {
    repository
        .get()
        .then(data => {
            res.status(200).send( data );
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao buscar o produto!',
                data: e
            });
        });
};

exports.getBySlug = (req, res, next) => {
    repository
        .getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao buscar slug!',
                data: e
            });
        });
};

exports.getById = (req, res, next) => {
    repository
        .getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao buscar slug!',
                data: e
            });
        });
};

exports.getByTag = (req, res, next) => {
    repository
        .getByTag(req.params.tag)
        .then(data => {
            res.status(200).send({ data });
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao buscar o produto!',
                data: e
            });
        });
};

exports.post = (req, res, next) => {
    let contract = new ValidatorContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres!');
    contract.hasMinLen(req.body.description, 3, 'A description deve conter pelo menos 3 caracteres!');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    };

    repository.create(req.body)
        .then(data => {
            res.status(201)
                .send({ data });
        }).catch(e => {
            res.status(400).send({
                message: 'Erro ao buscar produto!',
                data: e
            });
        });
};

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(data => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto!',
                data: e
            });
        })
};

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then(data => {
            res.status(200).send({
                message: 'Produto removido com sucesso!',
                data: data
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto!',
                data: e
            });
        })
};