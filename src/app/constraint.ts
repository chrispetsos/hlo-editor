import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Constraint {

    @JsonProperty('restricted_class', Value)
    restricted_class: Value = undefined;
    printInfo() {
        console.log('restricted_class = ' + this.restricted_class.value);
    }

}
