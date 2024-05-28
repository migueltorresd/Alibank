'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' : 'data-bs-target="#xs-controllers-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' :
                                            'id="xs-controllers-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' }>
                                            <li class="link">
                                                <a href="controllers/AccountController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/DepositController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/SecurityController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecurityController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/TransferController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransferController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' : 'data-bs-target="#xs-injectables-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' :
                                        'id="xs-injectables-links-module-AppModule-dbf3b01f09bfcdef397a0835ec0d63738f17377591d6d6176446218e14656b6b352050af9b79d8ce51d99ec1c5d4a5bc0cacb6f1873abc0c422a1aebb3a2a863"' }>
                                        <li class="link">
                                            <a href="injectables/AccountRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AccountTypeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccountTypeRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CustomerService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CustomerService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DepositRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DepositService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DepositService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DocumentTypeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentTypeRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SecurityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecurityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransferRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransferRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransferService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransferService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AccountController.html" data-type="entity-link" >AccountController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/DepositController.html" data-type="entity-link" >DepositController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/SecurityController.html" data-type="entity-link" >SecurityController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TransferController.html" data-type="entity-link" >TransferController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AccountEntity.html" data-type="entity-link" >AccountEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AccountTypeEntity.html" data-type="entity-link" >AccountTypeEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CustomerEntity.html" data-type="entity-link" >CustomerEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DepositEntity.html" data-type="entity-link" >DepositEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/DocumentTypeEntity.html" data-type="entity-link" >DocumentTypeEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/TransferEntity.html" data-type="entity-link" >TransferEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AccountDTO.html" data-type="entity-link" >AccountDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerDTO.html" data-type="entity-link" >CustomerDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomerUpdateDTO.html" data-type="entity-link" >CustomerUpdateDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataRangeDTO.html" data-type="entity-link" >DataRangeDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/DepositDTO.html" data-type="entity-link" >DepositDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExceptionFiltersFilter.html" data-type="entity-link" >ExceptionFiltersFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationDTO.html" data-type="entity-link" >PaginationDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignDTO.html" data-type="entity-link" >SignDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransferDTO.html" data-type="entity-link" >TransferDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/TypeOrmExceptionFilter.html" data-type="entity-link" >TypeOrmExceptionFilter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccountRepository.html" data-type="entity-link" >AccountRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountService.html" data-type="entity-link" >AccountService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AccountTypeRepository.html" data-type="entity-link" >AccountTypeRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerRepository.html" data-type="entity-link" >CustomerRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepositRepository.html" data-type="entity-link" >DepositRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DepositService.html" data-type="entity-link" >DepositService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentTypeRepository.html" data-type="entity-link" >DocumentTypeRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterceptorsInterceptor.html" data-type="entity-link" >InterceptorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MiddlewaresMiddleware.html" data-type="entity-link" >MiddlewaresMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PipesPipe.html" data-type="entity-link" >PipesPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SecurityService.html" data-type="entity-link" >SecurityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransferRepository.html" data-type="entity-link" >TransferRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransferService.html" data-type="entity-link" >TransferService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TypesOrmPostgresConfigService.html" data-type="entity-link" >TypesOrmPostgresConfigService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/GuardsGuard.html" data-type="entity-link" >GuardsGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccountModel.html" data-type="entity-link" >AccountModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountRepositoryInterface.html" data-type="entity-link" >AccountRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountTypeModel.html" data-type="entity-link" >AccountTypeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AccountTypeRepositoryInterface.html" data-type="entity-link" >AccountTypeRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BaseRepositoryInterface.html" data-type="entity-link" >BaseRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerModel.html" data-type="entity-link" >CustomerModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CustomerRepositoryInterface.html" data-type="entity-link" >CustomerRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataRangeModel.html" data-type="entity-link" >DataRangeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DepositModel.html" data-type="entity-link" >DepositModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DepositRepositoryInterface.html" data-type="entity-link" >DepositRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentTypeModel.html" data-type="entity-link" >DocumentTypeModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentTypeRepositoryInterface.html" data-type="entity-link" >DocumentTypeRepositoryInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaginationModel.html" data-type="entity-link" >PaginationModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransferModel.html" data-type="entity-link" >TransferModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransferRepositoryInterface.html" data-type="entity-link" >TransferRepositoryInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});