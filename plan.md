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
    | { state: LOGGED_OUT; auth_error?: string }
    | { state: PENDING }
    | {
        state: LOGGED_IN;
        privateKey: string;
        publicKey: string;
        mnemonicPhrase: string;
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

* [x] `CREATE_KEYS_REQUEST;`
* [x] `CREATE_KEYS_FAILED;`
* [x] `CREATE_KEYS_SUCCESS;`
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

* [x] `auth`
* [x] `app`
* [x] `accreditations`

### Epics

* [x] `Epic<GET_KEYS_FROM_STORAGE_REQUEST, GET_KEYS_FROM_STORAGE_FAILED | GET_KEYS_FROM_STORAGE_SUCCESS>`
* [x] `Epic<GET_KEYS_FROM_MNEMONIC_REQUEST, GET_KEYS_FROM_MNEMONIC_FAILED | GET_KEYS_FROM_MNEMONIC_SUCCESS>`
* [ ] `Epic<FETCH_ACCREDITATIONS_REQUEST, FETCH_ACCREDITATIONS_FAILED | FETCH_ACCREDITATIONS_SUCCESS>`

### Components - templates

* [x] `WelcomeScreen`
* [x] `MnemonicEntryScreen`
* [x] `AppHomeScreen`

### Components - functionality

* [x] `WelcomeScreen`
* [?] `MnemonicEntryScreen`
* [ ] `AppHomeScreen`

### Components - appearance

* [ ] `WelcomeScreen`
* [ ] `MnemonicEntryScreen`
* [ ] `AppHomeScreen`
