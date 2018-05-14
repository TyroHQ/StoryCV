# Digital CV

## Phase 0

### Features

* [ ] New User Creation
* [ ] Login via Mnemonic
* [ ] Accreditation List

### State

```typescript
type State = {
  auth:
    | { state: LOGGED_OUT; PENDING }
    | {
        state: LOGGED_IN;
        privateKey: string;
        publicKey: string;
      }
    | {
        state: LOGGING_IN_MNEMONIC;
        mnemonicField: string;
      };
  app: {
    accreditations: Loadable<string>[];
  };
};
```

### Actions

* [ ] `GET_KEYS_FROM_STORAGE_REQUEST;`
* [ ] `GET_KEYS_FROM_STORAGE_FAILED;`
* [ ] `GET_KEYS_FROM_STORAGE_SUCCESS;`
* [ ] `CHOOSE_MNEMONIC_LOGIN;`
* [ ] `UPDATE_MNEMONIC_FIELD;`
* [ ] `GET_KEYS_FROM_MNEMONIC_REQUEST;`
* [ ] `GET_KEYS_FROM_MNEMONIC_FAILED;`
* [ ] `GET_KEYS_FROM_MNEMONIC_SUCCESS;`
* [ ] `FETCH_ACCREDITATIONS_REQUEST;`
* [ ] `FETCH_ACCREDITATIONS_FAILED;`
* [ ] `FETCH_ACCREDITATIONS_SUCCESS;`

### Reducers

* [ ] `auth`
* [ ] `app`
* [ ] `accreditations`

### Epics

* [ ] `Epic<GET_KEYS_FROM_STORAGE_REQUEST, GET_KEYS_FROM_STORAGE_FAILED | GET_KEYS_FROM_STORAGE_SUCCESS>`
* [ ] `Epic<GET_KEYS_FROM_MNEMONIC_REQUEST, GET_KEYS_FROM_MNEMONIC_FAILED | GET_KEYS_FROM_MNEMONIC_SUCCESS>`
* [ ] `Epic<FETCH_ACCREDITATIONS_REQUEST, FETCH_ACCREDITATIONS_FAILED | FETCH_ACCREDITATIONS_SUCCESS>`
