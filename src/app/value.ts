import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class Value {

    @JsonProperty('value', String)
    value: string = undefined;
}
