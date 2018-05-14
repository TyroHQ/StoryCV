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

* [x] `GET_KEYS_FROM_STORAGE_REQUEST;`
* [x] `GET_KEYS_FROM_STORAGE_FAILED;`
* [x] `GET_KEYS_FROM_STORAGE_SUCCESS;`
* [x] `CHOOSE_MNEMONIC_LOGIN;`
* [x] `UPDATE_MNEMONIC_FIELD;`
* [x] `GET_KEYS_FROM_MNEMONIC_REQUEST;`
* [x] `GET_KEYS_FROM_MNEMONIC_FAILED;`
* [x] `GET_KEYS_FROM_MNEMONIC_SUCCESS;`
* [x] `FETCH_ACCREDITATIONS_REQUEST;`
* [x] `FETCH_ACCREDITATIONS_FAILED;`
* [x] `FETCH_ACCREDITATIONS_SUCCESS;`

### Reducers

* [ ] `auth`
* [ ] `app`
* [ ] `accreditations`

### Epics

* [ ] `Epic<GET_KEYS_FROM_STORAGE_REQUEST, GET_KEYS_FROM_STORAGE_FAILED | GET_KEYS_FROM_STORAGE_SUCCESS>`
* [ ] `Epic<GET_KEYS_FROM_MNEMONIC_REQUEST, GET_KEYS_FROM_MNEMONIC_FAILED | GET_KEYS_FROM_MNEMONIC_SUCCESS>`
* [ ] `Epic<FETCH_ACCREDITATIONS_REQUEST, FETCH_ACCREDITATIONS_FAILED | FETCH_ACCREDITATIONS_SUCCESS>`
